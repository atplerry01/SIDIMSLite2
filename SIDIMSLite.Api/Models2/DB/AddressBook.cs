using System;
using System.Collections.Generic;

namespace SIDIMSLite.Api.Models2.DB
{
    public partial class AddressBook
    {
        public int Id { get; set; }
        public string Attention { get; set; }
        public string Address1 { get; set; }
        public string Address2 { get; set; }
        public int ClientId { get; set; }
        public string Phone { get; set; }
        public DateTime Date { get; set; }
    }
}
