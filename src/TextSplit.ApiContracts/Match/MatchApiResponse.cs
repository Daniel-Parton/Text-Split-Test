using System.Collections;
using System.Collections.Generic;

namespace TextSplit.ApiContracts.Match
{
    public class MatchApiResponse
    {
        public IEnumerable<int> MatchCharacterPositions { get; set; } = new List<int>();
    }
}
