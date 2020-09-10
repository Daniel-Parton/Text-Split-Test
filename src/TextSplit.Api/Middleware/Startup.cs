using System;
using System.Diagnostics;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Serilog;
using Serilog.Events;
using ILogger = Serilog.ILogger;

namespace TextSplit.Api.Middleware
{
    internal class SerilogMiddleware
    {
        private const string MessageTemplate = "HTTP {RequestMethod} {RequestPath} responded {StatusCode} in {Elapsed:0.0000} ms";
        private readonly RequestDelegate _next;

        public SerilogMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task Invoke(HttpContext context, ILogger<SerilogMiddleware> logger)
        {
            var sw = Stopwatch.StartNew();

            try
            {
                await _next(context);

                sw.Stop();

                var statusCode = context.Response.StatusCode;
                var level = statusCode > 499
                    ? LogEventLevel.Error
                    : LogEventLevel.Information;

                var log = level == LogEventLevel.Error
                    ? ErrorLog(context)
                    : InformationLog(context);

                log.Write(level,
                    MessageTemplate,
                    context.Request.Method,
                    context.Request.Path,
                    statusCode,
                    sw.Elapsed.TotalMilliseconds);
            }
            catch (Exception ex) when (LogException(context, sw, ex))
            {

            }
        }

        private static ILogger ErrorLog(HttpContext context)
        {
            return Log
                .ForContext("User", context.User.GetClaim(ClaimTypes.NameIdentifier))
                .ForContext("RequestHeaders", context.Request.Headers.ToDictionary(h => h.Key, h => h.Value), true)
                .ForContext("RequestHost", context.Request.Host)
                .ForContext("RequestProtocol", context.Request.Protocol)
                .ForContext("RemoteIpAddress", context.Connection?.RemoteIpAddress)
                .ForContext("RemotePort", context.Connection?.RemotePort);
        }

        private static ILogger InformationLog(HttpContext context)
        {
            return Log
                .ForContext("User", context.User.GetClaim(ClaimTypes.NameIdentifier))
                .ForContext("RemoteIpAddress", context.Connection?.RemoteIpAddress)
                .ForContext("RemotePort", context.Connection?.RemotePort);
        }

        private static bool LogException(HttpContext httpContext, Stopwatch sw, Exception ex)
        {
            var log = ErrorLog(httpContext);
            log.Error(ex, MessageTemplate, httpContext.Request.Method, httpContext.Request.Path, 500, sw.Elapsed.TotalMilliseconds);
            return false;
        }
    }

    public static class PrincipalExtensions
    {
        public static string GetClaim(this ClaimsPrincipal principal, string claimType)
        {
            return principal.HasClaim(x => x.Type == claimType)
                ? principal.FindFirst(claimType).Value
                : "none";
        }
    }
}
