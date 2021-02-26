using Bogus;
using CustomCountries.Application.ViewModels;
using CustomCountries.Domain.Models.Country;
using System.Collections.Generic;

namespace CustomCountries.Unit.Tests.Mock
{
    public class CountryMock
    {
        public static Faker<CountryViewModel> CountryViewModelFaker =>
            new Faker<CountryViewModel>()
                .CustomInstantiator(x => new CountryViewModel { 
                    Id = x.Random.Int(),
                    Name = x.Address.Country(),
                    Capital = x.Address.State(),
                    Area = x.Random.Long(),
                    Population = x.Random.Long(),
                    PopulationDensity = x.Random.Float(),
                    TopLevelDomains = new List<TopLevelDomainsViewModel>()
                    {
                        new TopLevelDomainsViewModel(){ 
                            Name = x.Address.CountryCode(), 
                            Countries = new List<TopLevelDomainsCountriesViewModel>()
                            { 
                                new TopLevelDomainsCountriesViewModel(){ Name = x.Address.Country(), Capital = x.Address.State() },
                                new TopLevelDomainsCountriesViewModel(){ Name = x.Address.Country(), Capital = x.Address.State() }
                            } 
                        },
                        new TopLevelDomainsViewModel(){
                            Name = x.Address.CountryCode(),
                            Countries = new List<TopLevelDomainsCountriesViewModel>()
                            {
                                new TopLevelDomainsCountriesViewModel(){ Name = x.Address.Country(), Capital = x.Address.State() },
                                new TopLevelDomainsCountriesViewModel(){ Name = x.Address.Country(), Capital = x.Address.State() }
                            }
                        },
                        new TopLevelDomainsViewModel(){
                            Name = x.Address.CountryCode(),
                            Countries = new List<TopLevelDomainsCountriesViewModel>()
                            {
                                new TopLevelDomainsCountriesViewModel(){ Name = x.Address.Country(), Capital = x.Address.State() },
                                new TopLevelDomainsCountriesViewModel(){ Name = x.Address.Country(), Capital = x.Address.State() }
                            }
                        }
                    }
                });

        public static Faker<Country> CountryFaker =>
            new Faker<Country>()
                .CustomInstantiator(x => new Country
                {
                    CountryId = x.Random.Int(),
                    Name = x.Address.Country(),
                    Capital = x.Address.State(),
                    Area = x.Random.Long(),
                    Population = x.Random.Long(),
                    PopulationDensity = x.Random.Float(),
                    TopLevelDomains = new List<TopLevelDomains>()
                    {
                        new TopLevelDomains(){
                            Name = x.Address.CountryCode(),
                            Countries = new List<TopLevelDomainsCountries>()
                            {
                                new TopLevelDomainsCountries(){ Name = x.Address.Country(), Capital = x.Address.State() },
                                new TopLevelDomainsCountries(){ Name = x.Address.Country(), Capital = x.Address.State() }
                            }
                        },
                        new TopLevelDomains(){
                            Name = x.Address.CountryCode(),
                            Countries = new List<TopLevelDomainsCountries>()
                            {
                                new TopLevelDomainsCountries(){ Name = x.Address.Country(), Capital = x.Address.State() },
                                new TopLevelDomainsCountries(){ Name = x.Address.Country(), Capital = x.Address.State() }
                            }
                        },
                        new TopLevelDomains(){
                            Name = x.Address.CountryCode(),
                            Countries = new List<TopLevelDomainsCountries>()
                            {
                                new TopLevelDomainsCountries(){ Name = x.Address.Country(), Capital = x.Address.State() },
                                new TopLevelDomainsCountries(){ Name = x.Address.Country(), Capital = x.Address.State() }
                            }
                        }
                    }
                });
    }
}
