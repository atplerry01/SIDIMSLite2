using System;
using System.Collections.Generic;

namespace SIDIMSLite.Api.Models2.DB
{
    public partial class Notification
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Message { get; set; }
        public DateTime Date { get; set; }
    }
}
