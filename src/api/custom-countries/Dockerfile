#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/core/aspnet:3.1-buster-slim AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/core/sdk:3.1-buster AS build
WORKDIR /src
COPY ["src/CustomCountries.API/CustomCountries.API.csproj", "src/CustomCountries.API/"]
COPY ["src/CustomCountries.Application/CustomCountries.Application.csproj", "src/CustomCountries.Application/"]
COPY ["src/CustomCountries.Domain/CustomCountries.Domain.csproj", "src/CustomCountries.Domain/"]
COPY ["src/CustomCountries.Data/CustomCountries.Data.csproj", "src/CustomCountries.Data/"]
RUN dotnet restore "src/CustomCountries.API/CustomCountries.API.csproj"
COPY . .
WORKDIR "/src/src/CustomCountries.API"
RUN dotnet build "CustomCountries.API.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "CustomCountries.API.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "CustomCountries.API.dll"]