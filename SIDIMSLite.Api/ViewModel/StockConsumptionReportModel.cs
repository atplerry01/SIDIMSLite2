using System;

namespace SIDIMSLite.Api.ViewModel
{
    public class StockReportModel
    {

        public int Id { get; set; }
        public int StockId { get; set; }
        public int? ClientId { get; set; }
        public string FileName { get; set; }

        public int OperationId { get; set; }
        public int ClosingBalance { get; set; }
        public string DataQuantity { get; set; }
        public int OpeningStock { get; set; }

        public virtual StockModel Stock { get; set; }
        public virtual OperationModel Operation { get; set; }
        public int? CardQuantity { get; set; }
        public DateTime Date { get; set; }

    }
}