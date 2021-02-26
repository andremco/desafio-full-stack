using System.Collections.Generic;

namespace CustomCountries.Application.ViewModels
{
    public class TopLevelDomainsViewModel
    {
        public string Name { get; set; }

        public ICollection<TopLevelDomainsCountriesViewModel> Countries { get; set; }

        public TopLevelDomainsViewModel()
        {
            Countries = new HashSet<TopLevelDomainsCountriesViewModel>();
        }
    }
}
