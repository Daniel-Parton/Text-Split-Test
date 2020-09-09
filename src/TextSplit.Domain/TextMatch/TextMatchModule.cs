using Microsoft.Extensions.DependencyInjection;

namespace TextSplit.Domain.TextMatch
{
    public static class TextMatchModule
    {
        public static IServiceCollection AddTextMatch(this IServiceCollection services)
        {
            services.AddScoped<ITextMatchService, TextMatchService>();

            return services;
        }
    }
}