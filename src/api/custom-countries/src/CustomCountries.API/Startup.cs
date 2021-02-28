using CustomCountries.API.Auth;
using CustomCountries.API.Filters;
using CustomCountries.API.Middlewares;
using CustomCountries.Application.AutoMapper;
using CustomCountries.Application.Services;
using CustomCountries.Application.Services.Interfaces;
using CustomCountries.Data.Repositories;
using CustomCountries.Domain.Interfaces.Notifications;
using CustomCountries.Domain.Interfaces.Repositories;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.IO;
using System.Reflection;

namespace CustomCountries.API
{
    public class Startup
    {
        public Startup(IConfiguration configuration, IWebHostEnvironment webHostEnvironment)
        {
            Configuration = configuration;
            WebHostEnvironment = webHostEnvironment;
        }

        public IConfiguration Configuration { get; }
        public IWebHostEnvironment WebHostEnvironment { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers();
            services.AddMvc(options =>
            {
                options.Filters.Add<DomainNotificationFilter>();
                options.EnableEndpointRouting = false;
            }).AddJsonOptions(options =>
            {
                options.JsonSerializerOptions.IgnoreNullValues = true;
            });

            // configure basic authentication 
            services.AddAuthentication("BasicAuthentication")
                .AddScheme<AuthenticationSchemeOptions, BasicAuthenticationHandler>("BasicAuthentication", null);

            if (!WebHostEnvironment.IsProduction())
            {
                services.AddSwaggerGen(c =>
                {
                    c.SwaggerDoc("v1",
                        new OpenApiInfo
                        {
                            Title = "Custom Countries API",
                            Version = "v1",
                            Description = "API",
                            Contact = new OpenApiContact
                            {
                                Name = "André Militão Costa Oliveira",
                                Email = "andremco1992@gmail.com"
                            }
                        });
                    c.AddSecurityDefinition("Basic Auth", new OpenApiSecurityScheme()
                    {
                        Type = SecuritySchemeType.Http,
                        Name = "Authorization",
                        Scheme = "basic",
                        Description = "Authorization API",
                        In = ParameterLocation.Header
                    });
                    c.AddSecurityRequirement(new OpenApiSecurityRequirement()
                    {
                        {
                            new OpenApiSecurityScheme
                            {
                                Reference = new OpenApiReference
                                {
                                    Type = ReferenceType.SecurityScheme,
                                    Id = "Basic Auth"
                                }
                            },
                            new List<string>()
                        }
                    });

                    // Set the comments path for the Swagger JSON and UI.
                    var xmlFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
                    var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);
                    c.IncludeXmlComments(xmlPath);
                });
            }

            services.AddCors(o => o.AddPolicy("PolicyAPI", builder =>
            {
                builder.AllowAnyOrigin()
                       .AllowAnyMethod()
                       .AllowAnyHeader();
            }));

            // If using Kestrel:
            services.Configure<Microsoft.AspNetCore.Server.Kestrel.Core.KestrelServerOptions>(options =>
            {
                options.Limits.MaxRequestBodySize = int.MaxValue;
                options.AllowSynchronousIO = true;
            });

            // If using IIS:
            services.Configure<IISServerOptions>(options =>
            {
                options.MaxRequestBodySize = int.MaxValue;
                options.AllowSynchronousIO = true;
            });

            services.AddHttpContextAccessor();
            RegisterServices(services);
        }

        private void RegisterServices(IServiceCollection services)
        {
            services.AddAutoMapper(typeof(CountryProfile));

            #region Service
            services.AddScoped<ICountryService, CountryService>();
            services.AddScoped<IGithubService>(c => new GithubService(Environment.GetEnvironmentVariable("LinkGithub")));
            #endregion

            #region Domain
            services.AddScoped<IDomainNotification, DomainNotification>();
            #endregion

            #region Data
            services.AddScoped<IMongoClient>(c => new MongoClient(Environment.GetEnvironmentVariable("ConnectionStringMongo")));
            services.AddScoped<ICountryRepository>(c => new CountryRepository(c.GetRequiredService<IMongoClient>(), Environment.GetEnvironmentVariable("DatabaseMongo")));
            #endregion
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c =>
                {
                    c.SwaggerEndpoint("/swagger/v1/swagger.json", "Custom Countries API");
                });
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthentication();

            app.UseAuthorization();

            app.UseCors("PolicyAPI");

            app.UseExceptionHandler(new ExceptionHandlerOptions
            {
                ExceptionHandler = new ErrorHandlerMiddleware(env).Invoke
            });

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
