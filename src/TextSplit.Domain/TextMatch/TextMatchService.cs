using System;
using System.Collections.Generic;
using TextSplit.Domain.Extensions;
using TextSplit.Domain.TextMatch.Models;

namespace TextSplit.Domain.TextMatch
{
    public interface ITextMatchService
    {
        MatchResponse Match(string text, string subText);
    }
    public class TextMatchService : ITextMatchService
    {
        public MatchResponse Match(string text, string subText)
        {
            var response = new MatchResponse();
            if (text.IsEmpty() || subText.IsEmpty())
            {
                return response;
            }

            var matches = new List<int>();
            var indexAddition = 0;
            while (true)
            {
                var index = text.IndexOf(subText, StringComparison.InvariantCultureIgnoreCase);
                if (index < 0)
                {
                    break;
                }

                matches.Add(index + indexAddition);

                var nextPosition = index + 1;
                indexAddition += nextPosition;
                text = text.Substring(nextPosition, text.Length - nextPosition);
            }

            return new MatchResponse{ MatchCharacterPositions = matches };
        }
    }
}
