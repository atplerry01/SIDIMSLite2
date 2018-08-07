using System;

namespace SIDIMSLite.Api.ViewModel
{
    public class StockMap
    {
        public int Id { get; set; }
        public int? CategoryId { get; set; }
        public int? ClientId { get; set; }
        public string Product { get; set; }
        public string ProductType { get; set; }

        public int OpeningStock { get; set; }
        public int ClosingStock { get; set; }
        public int Addition { get; set; }
        public int Waste { get; set; }
        public int Consumption { get; set; }

        public DateTime Date { get; set; }
    }
}