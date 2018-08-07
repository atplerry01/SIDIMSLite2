using System;
using System.Collections.Generic;

namespace SIDIMSLite.Api.Models2.DB
{
    public partial class AuditUsers
    {
        public string Username { get; set; }
        public string Pword { get; set; }
        public string Fullname { get; set; }
        public string UserLevel { get; set; }
    }
}
