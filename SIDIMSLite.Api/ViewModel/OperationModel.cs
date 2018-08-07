using System;

namespace SIDIMSLite.Api.ViewModel
{
    public class OperationModel
    {
        public int Id { get; set; }
        public int StockId { get; set; }
        public string Operation { get; set; }
        public int Quantity { get; set; }
        public string UserId { get; set; }
        public DateTime Date { get; set; }
    }
}