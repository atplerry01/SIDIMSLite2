using System;
using System.Collections.Generic;

namespace SIDIMSLite.Api.Models
{
    public partial class Operations
    {
        public int Id { get; set; }
        public int StockId { get; set; }
        public string Operation { get; set; }
        public int Quantity { get; set; }
        public string UserId { get; set; }
        public DateTime Date { get; set; }
    }
}
