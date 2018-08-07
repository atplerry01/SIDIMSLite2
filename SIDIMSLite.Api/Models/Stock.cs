using System;
using System.Collections.Generic;

namespace SIDIMSLite.Api.Models
{
    public class Stock
    {
        public int Id { get; set; }
        public int? CategoryId { get; set; }
        public int? ClientId { get; set; }
        public int? AddressBookId { get; set; }
        public string Product { get; set; }
        public string ProductType { get; set; }
        public byte[] Screenshot { get; set; }
        public string Location { get; set; }
        public string Kcv { get; set; }
        public string Chip { get; set; }
        public string Batchnumber { get; set; }
        public string Bin { get; set; }
        public string Atr { get; set; }
        public DateTime Date { get; set; }
    }
}
