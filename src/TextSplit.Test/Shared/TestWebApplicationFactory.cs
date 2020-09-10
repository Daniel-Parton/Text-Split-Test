using System.Collections.Generic;
using System.IO;
using System.Reflection;
using System.Text;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using Newtonsoft.Json.Serialization;
using TextSplit.Domain;

namespace TextSplit.Test.Shared
{
    public class TestWebApplicationFactory<TStartup> : WebApplicationFactory<TStartup> where TStartup : class
    {
        protected override void ConfigureWebHost(IWebHostBuilder builder)
        {
            builder.ConfigureAppConfiguration((context, configBuilder) =>
            {
                var json = JsonConvert.SerializeObject(ApplicationSettings.New(), new JsonSerializerSettings
                {
                    ContractResolver = new PrivateReadResolver(),
                    Converters = new List<JsonConverter> { new StringEnumConverter() },
                });
                configBuilder.Sources.Clear();
                configBuilder.AddJsonStream(new MemoryStream(Encoding.ASCII.GetBytes(json)));
            });
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
}
