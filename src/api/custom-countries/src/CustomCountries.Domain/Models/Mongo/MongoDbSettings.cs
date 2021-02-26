using CustomCountries.Domain.Interfaces.Mongo;

namespace CustomCountries.Domain.Models.Mongo
{
    public class MongoDbSettings : IMongoDbSettings
    {
        public string DatabaseName { get; set; }
        public string ConnectionString { get; set; }
    }
}
