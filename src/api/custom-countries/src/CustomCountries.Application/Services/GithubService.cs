using CustomCountries.Application.Services.Interfaces;

namespace CustomCountries.Application.Services
{
    public class GithubService : IGithubService
    {
        private readonly string _link;

        public GithubService(string link)
        {
            _link = link;
        }

        public string GetLinkRepo() 
        {
            return _link;
        }
    }
}
