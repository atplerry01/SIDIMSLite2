using System;

namespace SIDIMSLite.Api.ViewModel
{
    public class StockModel
    {
        public int Id { get; set; }
        public int? CategoryId { get; set; }
        public int? ClientId { get; set; }
        public string Product { get; set; }
        public string ProductType { get; set; }
        public DateTime Date { get; set; }
    }
}