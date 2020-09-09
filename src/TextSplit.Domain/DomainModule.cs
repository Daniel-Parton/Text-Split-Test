using Microsoft.Extensions.DependencyInjection;
using TextSplit.Domain.Shared;
using TextSplit.Domain.TextMatch;

namespace TextSplit.Domain
{
    public static class DomainModule
    {
        public static IServiceCollection AddDomain(this IServiceCollection services, ApplicationSettings settings)
        {
            return services
                .AddTextMatch()
                .AddShared();
        }
    }
}
