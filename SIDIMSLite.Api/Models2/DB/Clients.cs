using System;
using System.Collections.Generic;

namespace SIDIMSLite.Api.Models2.DB
{
    public partial class Clients
    {
        public int Id { get; set; }
        public string Client { get; set; }
        public string Country { get; set; }
        public DateTime Date { get; set; }
    }
}
