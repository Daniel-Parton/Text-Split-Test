using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TextSplit.ApiContracts.Match;
using TextSplit.Domain.TextMatch;

namespace TextSplit.Api.Controllers
{
    [AllowAnonymous]
    [ApiController]
    [Route(Endpoints.MatchBase)]

    public class MatchController : ControllerBase
    {
        private readonly ITextMatchService _textMatchService;

        public MatchController(ITextMatchService textMatchService)
        {
            _textMatchService = textMatchService;
        }

        [HttpGet]
        [Route(Endpoints.MatchTextRelative)]
        public Task<MatchApiResponse> Match([FromQuery]MatchApiRequest apiRequest)
        {
            var response = _textMatchService.Match(apiRequest.Text, apiRequest.SubText);
            return Task.FromResult(new MatchApiResponse
            {
                MatchCharacterPositions = response.MatchCharacterPositions
            });
        }
    }
}
