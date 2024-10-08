using Newtonsoft.Json;

namespace AcmeOrder.Services;

public class Payment
{
    public string Amount { get; set; }
    public string Message { get; set; }
    public string Success { get; set; }

    public int Status { get; set; }
    [JsonProperty("transactionID")] public string TransactionId { get; set; }
}