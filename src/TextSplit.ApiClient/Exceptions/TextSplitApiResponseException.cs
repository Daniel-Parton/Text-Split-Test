using System;

namespace TextSplit.ApiClient.Exceptions
{
    public class TextSplitApiResponseException : Exception
    {
        public TextSplitApiResponseException() { }
        public TextSplitApiResponseException(string message) : base(message) { }
    }
}