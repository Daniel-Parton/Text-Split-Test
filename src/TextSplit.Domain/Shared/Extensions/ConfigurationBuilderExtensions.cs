using System;
using System.Collections.Generic;
using System.IO;
using System.Reflection;
using System.Text;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Configuration.Json;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using Newtonsoft.Json.Serialization;

namespace TextSplit.Domain.Shared.Extensions
{
    public static class ConfigurationBuilderExtensions
    {
        public static IConfigurationBuilder ResolveSettings(this IConfigurationBuilder config,
            string environment,
            Action<ApplicationSettings> settingsAction = null)
        {
            var settings = ApplicationSettings.New(environment, settingsAction);
            return config
                .AddDefaultSettings(settings);
        }

        private static IConfigurationBuilder AddDefaultSettings(this IConfigurationBuilder config, ApplicationSettings settings)
        {
            var json = JsonConvert.SerializeObject(settings, new JsonSerializerSettings
            {
                ContractResolver = new PrivateReadResolver(),
                Converters = new List<JsonConverter> { new StringEnumConverter() },
            });

            config.Sources.Insert(0, new JsonStreamConfigurationSource { Stream = new MemoryStream(Encoding.ASCII.GetBytes(json)) });

            return config;
        }
    }

    public class PrivateReadResolver : DefaultContractResolver
    {
        protected override JsonProperty CreateProperty(MemberInfo member, MemberSerialization memberSerialization)
        {
            var prop = base.CreateProperty(member, memberSerialization);
            prop.Readable = true;
            return prop;
        }
    }
}
