using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Configuration;

namespace TextSplit.Domain.Shared
{
    public static class SharedModule
    {
        public static IServiceCollection AddShared(this IServiceCollection services)
        {
            return services;
        }

        public static ApplicationSettings GetAndRegisterApplicationSettings(this IServiceCollection services, IConfiguration config)
        {
            var settings = new ApplicationSettings();
            config.Bind(settings);
            services.AddSingleton(settings);
            return settings;
        }
    }
}
