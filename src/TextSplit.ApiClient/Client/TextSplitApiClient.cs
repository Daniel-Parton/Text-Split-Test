using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using TextSplit.ApiClient.Exceptions;
using TextSplit.ApiContracts.Error;
using TextSplit.ApiContracts.Match;

namespace TextSplit.ApiClient.Client
{
    public class TextSplitApiClient : ITextSplitApiClient
    {
        private readonly ILogger<TextSplitApiClient> _logger;
        private readonly HttpClient _client;

        public TextSplitApiClient(TextSplitApiClientOptions options, ILogger<TextSplitApiClient> logger)
        {
            _logger = logger;
            try
            {
                _logger = logger;
                _client = new HttpClient
                {
                    BaseAddress = new Uri(options.BaseUri),
                };

                _client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Counldn't initialize TextSplit Client.");
            }
        }

        /// <summary>
        /// Used for integration Tests.  Use other constructor
        /// </summary>
        public TextSplitApiClient(HttpClient client, ILogger<TextSplitApiClient> logger)
        {
            _client = client;
            _logger = logger;
        }

        public async Task<MatchApiResponse> Match(MatchApiRequest request)
        {
            var queryParams = new List<(string, string)>
            {
                (nameof(request.Text), request.Text),
                (nameof(request.SubText), request.SubText),
            };

            return await ExecuteRequestAsync<MatchApiResponse>(new HttpRequestMessage
            {
                Method = HttpMethod.Get,
                RequestUri = new Uri(ResolveUrl(Endpoints.MatchText, queryParams), UriKind.Relative),
            });
        }

        private async Task<T> ExecuteRequestAsync<T>(HttpRequestMessage request)
        {
            var response = await ExecuteRequestAsync(request);

            //If we got this far we assume the response was a success
            try
            {
                return await ToModel<T>(response);
            }
            catch (JsonSerializationException e)
            {
                var message = $"Failed to map response from API: {request.RequestUri}";
                _logger.LogError(message, e);
                throw new TextSplitApiResponseException(message);
            }
        }

        private async Task<HttpResponseMessage> ExecuteRequestAsync(HttpRequestMessage request)
        {
            var response = await _client.SendAsync(request);
            if (response.IsSuccessStatusCode)
            {
                return response;
            }

            try
            {
                throw new TextSplitApiErrorException($"Error Calling API: {request.RequestUri}",
                    await ToModel<ErrorApiResponse>(response));
            }
            catch (JsonSerializationException e)
            {
                var message = $"Failed to map error response from API: {request.RequestUri}";
                _logger.LogError(message, e);
                throw new TextSplitApiResponseException(message);
            }
        }

        private async Task<T> ToModel<T>(HttpResponseMessage response)
        {
            var content = await response.Content.ReadAsStringAsync();
            return JsonConvert.DeserializeObject<T>(content);
        }

        private string ResolveUrl(string url, IEnumerable<(string, string)> queryParams)
        {
            if (queryParams == null || !queryParams.Any())
            {
                return url;
            }

            return $"{url}?{string.Join("&", queryParams.Select(e => $"{e.Item1}={e.Item2}"))}";
        }

        public void Dispose()
        {
            _client?.Dispose();
        }
    }
}
