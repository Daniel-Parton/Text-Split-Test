using System;
using System.Collections.Generic;
using TextSplit.Domain.Extensions;

namespace TextSplit.Domain
{
    public class ApplicationSettings
    {
        public SerilogSettings Serilog { get; set; }
        public HostingSettings Hosting { get; set; }

        public static ApplicationSettings New(string environment = null, Action<ApplicationSettings> settingsAction = null)
        {
            var settings = new ApplicationSettings
            {
                Serilog = new SerilogSettings
                {
                    Enrich = new[] { "FromLogContext", "WithExceptionDetails", "WithMachineName" },
                    MinimumLevel = new SerilogSettings.Level
                    {
                        Default = "Information",
                        Override = new Dictionary<string, string>
                        {
                            { "System", "Warning" },
                            { "Microsoft", "Warning" },
                        }
                    }
                },
                Hosting = new HostingSettings{ }
                
            };

            if (environment.IsEmpty())
            {
                settingsAction?.Invoke(settings);
                return settings;
            }

            if (environment.Equals("development", StringComparison.InvariantCultureIgnoreCase))
            {
                settings.Serilog = new SerilogSettings
                {
                    Enrich = new[] { "FromLogContext", "WithExceptionDetails", "WithMachineName" },
                    MinimumLevel = new SerilogSettings.Level
                    {
                        Default = "Information",
                        Override = new Dictionary<string, string>
                        {
                            { "System", "Information" },
                            { "Microsoft", "Information" }
                    }
                    },
                    WriteTo = new dynamic[]
                    {
                        "Console"
                    }
                };
            }

            if (environment.Equals("production", StringComparison.InvariantCultureIgnoreCase))
            {
                settings.Serilog.MinimumLevel = new SerilogSettings.Level
                {
                    Default = "Information",
                    Override = new Dictionary<string, string>
                    {
                        { "System", "Warning" },
                        { "Microsoft", "Warning" },
                    }
                };

                settings.Serilog.WriteTo = new dynamic[]
                {
                    "Console"
                };
            }

            settingsAction?.Invoke(settings);
            return settings;
        }

        public class SerilogSettings
        {
            public Level MinimumLevel { get; set; }
            public string[] Enrich { get; set; }
            public dynamic[] WriteTo { get; set; }
            public class Level
            {
                public string Default { get; set; }
                public Dictionary<string, string> Override { get; set; }
            }
        }

        public class HostingSettings
        {
            public string CorsHosts { get; set; }
        }
    }
}
