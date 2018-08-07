using System.Collections.Generic;
using System.Collections.ObjectModel;
using SIDIMSLite.Api.Models.Common;

namespace SIDIMSLite.Api.Models.Account
{
    public class SidClient : BaseEntity
    {
        public string Name { get; set; }
        public string ShortCode { get; set; }
    }
}