using AutoMapper;
using CustomCountries.Application.ViewModels;
using CustomCountries.Domain.Models.Country;

namespace CustomCountries.Application.AutoMapper
{
    public class CountryProfile : Profile
    {
        public CountryProfile()
        {
            CreateMap<Country, CountryViewModel>()
                .ForMember(s => s.Id, d => d.MapFrom(d => d.CountryId));

            CreateMap<CountryViewModel, Country>()
                .ForMember(s => s.CountryId, d => d.MapFrom(c => c.Id))
                .ForMember(s => s.Id, d => d.Ignore());

            CreateMap<TopLevelDomainsViewModel, TopLevelDomains>().ReverseMap();
            CreateMap<TopLevelDomainsCountriesViewModel, TopLevelDomainsCountries>().ReverseMap();
        }
    }
}
