using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;
using Microsoft.ApplicationInsights.DependencyCollector;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.OpenApi.Models;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using Newtonsoft.Json.Serialization;
using Serilog;
using TextSplit.Api.Filters;
using TextSplit.Api.Middleware;
using TextSplit.Domain;
using TextSplit.Domain.Extensions;
using TextSplit.Domain.Shared;

namespace TextSplit.Api
{
    public class Startup
    {
        public IConfiguration Configuration { get; }
        private ApplicationSettings ApplicationSettings { get; set; }

        private const string CorsPolicyName = "TextSplit-CorsPolicy";

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }
        public void ConfigureServices(IServiceCollection services)
        {
            ApplicationSettings = services.GetAndRegisterApplicationSettings(Configuration);

            //Logging
            services.AddLogging(builder => builder.ClearProviders());
            Log.Logger = new LoggerConfiguration()
                .ReadFrom.Configuration(Configuration)
                .CreateLogger();

            services.AddApplicationInsightsTelemetry();

            services.AddDomain(ApplicationSettings);

            // Api Cors
            services.AddCors(options =>
            {
                var origins = (ApplicationSettings.Hosting.CorsHosts).IsEmpty() ? new string[] { } :
                    ApplicationSettings.Hosting.CorsHosts.Split(',').Select(e => e.Trim()).ToArray();
                options.AddPolicy(CorsPolicyName,
                    builder => builder.WithOrigins(origins).AllowAnyHeader().AllowAnyMethod());
            });

            services
                .AddControllers(options =>
                {
                    options.Filters.Add<UnhandledExceptionFilter>();
                    options.Filters.Add<ValidationActionFilter>();
                })
                //https://stackoverflow.com/questions/57912012/net-core-3-upgrade-cors-and-jsoncycle-xmlhttprequest-error
                .AddNewtonsoftJson(o =>
                {
                    o.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;
                    o.SerializerSettings.Formatting = Formatting.None;
                    o.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
                    o.SerializerSettings.Converters.Add(new StringEnumConverter());
                });

            // In production, the React files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/build";
            });
            var productVersion = FileVersionInfo.GetVersionInfo(Assembly.GetExecutingAssembly().Location).ProductVersion;
            var displayVersion = $"v{productVersion}";

            // Api Documentation
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "TextSplit.Api", Version = displayVersion });
                c.CustomSchemaIds(x => x.FullName);
            });

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env,
            IHostApplicationLifetime hostApplicationLifetime,
            ILoggerFactory loggerFactory,
            ILogger<Startup> logger)
        {
            loggerFactory.AddSerilog();
            hostApplicationLifetime.ApplicationStopped.Register(Log.CloseAndFlush);
            logger.LogInformation("Running in {environment}", env.EnvironmentName);

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseHsts();
                app.UseHttpsRedirection();
            }

            app.UseSwagger();
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "TextSplit.Api");
            });

            app.UseRouting();
            app.UseCors(CorsPolicyName);

            app.UseMiddleware<SerilogMiddleware>();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });

            app.UseStaticFiles();
            app.UseSpaStaticFiles();
            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    // This option allows you to start the create react app server seperately from the web api project
                    // This replaces spa.UseReactDevelopmentServer(npmScript: "start")
                    // Reference https://github.com/aspnet/JavaScriptServices/issues/997
                    spa.UseProxyToSpaDevelopmentServer("http://localhost:3000");
                }
            });
        }
    }
}
