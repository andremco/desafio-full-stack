namespace CustomCountries.Domain.Interfaces.Mongo
{
    public interface IMongoDbSettings
    {
        string DatabaseName { get; set; }
        string ConnectionString { get; set; }
    }
}
