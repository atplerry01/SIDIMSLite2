namespace SIDIMSLite.Api.ViewModel
{
    public class StockSummaryResource
    {
        public int Id { get; set; }
        public int? StockCount { get; set; }
        public int CurrentStock { get; set; }
        public string Filter { get; set; }
    }
}