using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using TextSplit.Api;
using TextSplit.ApiClient.Client;
using TextSplit.ApiClient.Exceptions;
using TextSplit.ApiContracts.Match;
using TextSplit.Domain.Shared.Extensions;
using TextSplit.Test.Shared;
using Xunit;

namespace TextSplit.Test.Api
{
    public class TextSplitApiClientTests : IClassFixture<TestWebApplicationFactory<Startup>>, IDisposable
    {
        private readonly ITextSplitApiClient _client;

        public TextSplitApiClientTests(TestWebApplicationFactory<Startup> factory)
        {
            var serviceProvider = ServiceProviderFactory.GetServiceProvider();
            _client = new TextSplitApiClient(factory.CreateClient(), serviceProvider.GetService<ILogger<TextSplitApiClient>>());
        }

        [Fact]
        public async Task Match_CallWork()
        {
            try
            {
                //Arrange and Act
                var response = await _client.Match(new MatchApiRequest{ Text = "Abc", SubText = "a"});

                //Assert
                Assert.True(response != null);
                Assert.True(!response.MatchCharacterPositions.IsNullOrEmpty());
                Assert.True(response.MatchCharacterPositions.First() == 0);
            }
            catch (TextSplitApiErrorException e)
            {
                throw new Exception($"{e.Message}: {JsonConvert.SerializeObject(e.Error, Formatting.Indented)}");
            }
        }

        public void Dispose()
        {
            _client.Dispose();
        }
    }
}
