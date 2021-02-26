using CustomCountries.Domain.Interfaces.Mongo;
using CustomCountries.Domain.Models.Country;
using MongoDB.Driver;

namespace CustomCountries.Data.Repositories
{
    public class CountryRepository : MongoRepository<Country>
    {
        public CountryRepository(IMongoClient mongoClient, string dataBaseName) : base(mongoClient, dataBaseName)
        {
        }
    }
}
