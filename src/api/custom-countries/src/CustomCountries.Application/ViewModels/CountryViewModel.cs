using System.Collections.Generic;

namespace CustomCountries.Application.ViewModels
{
    public class CountryViewModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Capital { get; set; }
        public long Area { get; set; }
        public long Population { get; set; }
        public float PopulationDensity { get; set; }
        public ICollection<TopLevelDomainsViewModel> TopLevelDomains { get; set; }

        public CountryViewModel()
        {
            TopLevelDomains = new HashSet<TopLevelDomainsViewModel>();
        }
    }
}