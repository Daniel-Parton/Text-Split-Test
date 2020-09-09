using System;
using TextSplit.ApiContracts.Error;

namespace TextSplit.ApiClient.Exceptions
{
    public class TextSplitApiErrorException : Exception
    {
        public ErrorApiResponse Error { get; set; }

        public TextSplitApiErrorException(string message, ErrorApiResponse error) : base(message)
        {
            Error = error;
        }
    }
}