using AutoMapper;
using CustomCountries.Application.ViewModels;
using CustomCountries.Domain.Models.Country;

namespace CustomCountries.Application.AutoMapper
{
    public class CountryProfile : Profile
    {
        public CountryProfile()
        {
            CreateMap<Country, CountryViewModel>().ForMember(s => s.Id, d => d.MapFrom(d => d.CountryId)).ReverseMap();
            CreateMap<TopLevelDomainsViewModel, TopLevelDomains>().ReverseMap();
            CreateMap<TopLevelDomainsCountriesViewModel, TopLevelDomainsCountries>().ReverseMap();
        }
    }
}
