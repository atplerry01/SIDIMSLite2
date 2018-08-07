using System;
using System.Collections.Generic;

namespace SIDIMSLite.Api.Models2.DB
{
    public partial class RaisedJobs
    {
        public string CustomerName { get; set; }
        public string CardType { get; set; }
        public string Quantity { get; set; }
        public string FileName { get; set; }
        public string UploadTime { get; set; }
        public string RaisedBy { get; set; }
        public string ReceuveBy { get; set; }
        public DateTime? RaisedTime { get; set; }
        public string Remarks { get; set; }
        public int? AuditId { get; set; }
        public string Issuance { get; set; }
        public string Perso { get; set; }
        public string Qa { get; set; }
        public string Qc { get; set; }
        public string Delivery { get; set; }
    }
}
