using System;

namespace SIDIMSLite.Api.ViewModel
{
    public class StockVaultModel
    {
        public int Id { get; set; }
        public string Product { get; set; }
        public int ClosingBalance { get; set; }
        public int OpeningStock { get; set; }
        public int TotalAddition { get; set; }
        public int TotalWaste { get; set; }
        public int TotalIssuance { get; set; }
        public DateTime Date { get; set; }
    }
}