using System.ComponentModel.DataAnnotations.Schema;
using SIDIMSLite.Api.Models.Common;

namespace SIDIMSLite.Api.Models.Account
{
    public class ClientUser : BaseEntity
    {
        public ClientUser()
        {
            ChangePassword = false;
        }

        public int SidClientId { get; set; }
        public string ClientName { get; set; }
        public string UserId { get; set; }

        [ForeignKey("UserId")]
        public virtual ApplicationUser User { get; set; }
        public bool ChangePassword { get; set; }
    }
}