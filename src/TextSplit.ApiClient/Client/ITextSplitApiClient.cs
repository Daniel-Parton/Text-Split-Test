using System;
using System.Threading.Tasks;
using TextSplit.ApiContracts.Match;

namespace TextSplit.ApiClient.Client
{
    public interface ITextSplitApiClient : IDisposable
    {
        Task<MatchApiResponse> Match(MatchApiRequest request);
    }
}
