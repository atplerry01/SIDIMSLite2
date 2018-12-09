using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace SIDIMSLite.Api.Models
{

    public class Mis
    {
        public Mis()
        {
            CardQuantity = 0;
        }

        public int Id { get; set; }
        public int StockId { get; set; }
        public virtual Stock Stock { get; set; }
        public int? ClientId { get; set; }
        public int OperationId { get; set; }

        // [ForeignKey("OperationId")]
        public virtual Operations Operation { get; set; }
        public int? OperationId2 { get; set; }
        public int ClosingBalance { get; set; }
        public string FileName { get; set; }
        public string DataQuantity { get; set; }
        public int OpeningStock { get; set; }
        public string DataGen { get; set; }
        public string Personalization { get; set; }
        public string Fulfillment { get; set; }
        public string Printing { get; set; }
        public string Others { get; set; }
        public string Status { get; set; }
        public int CardQuantity { get; set; }
        public int? PreviousDelivery { get; set; }
        public string Batch { get; set; }
        public DateTime Date { get; set; }
    }
}
