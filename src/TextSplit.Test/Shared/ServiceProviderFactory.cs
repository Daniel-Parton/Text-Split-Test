using System;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using TextSplit.Domain;

namespace TextSplit.Test.Shared
{
    public static class ServiceProviderFactory
    {
        public static ServiceProvider GetServiceProvider(Action<ApplicationSettings> settingsBuilder = null)
        {
            var settings = ApplicationSettings.New();
            settingsBuilder?.Invoke(settings);

            var services = new ServiceCollection()
                .AddLogging(builder => builder.ClearProviders())
                .AddDomain(settings);

            return services.BuildServiceProvider();
        }
    }
}