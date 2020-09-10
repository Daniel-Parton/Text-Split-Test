namespace TextSplit.ApiContracts.Error
{
    public class ErrorApiResponse
    {
        public string Message { get; set; }
        public bool UnhandledException { get; set; }
        public string Exception { get; set; }
    }
}
