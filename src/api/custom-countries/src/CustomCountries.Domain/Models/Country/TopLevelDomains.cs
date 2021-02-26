using System.Collections.Generic;

namespace CustomCountries.Domain.Models.Country
{
    public class TopLevelDomains
    {
        public string Name { get; set; }

        public ICollection<TopLevelDomainsCountries> Countries { get; set; }

        public TopLevelDomains()
        {
            Countries = new HashSet<TopLevelDomainsCountries>();
        }
    }
}
