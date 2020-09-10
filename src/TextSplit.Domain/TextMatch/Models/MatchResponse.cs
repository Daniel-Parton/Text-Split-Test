using System.Collections.Generic;

namespace TextSplit.Domain.TextMatch.Models
{
    public class MatchResponse
    {
        public List<int> MatchCharacterPositions { get; set; } = new List<int>();
    }
}
