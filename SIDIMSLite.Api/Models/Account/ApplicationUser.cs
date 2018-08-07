using Microsoft.AspNetCore.Identity;
using SIDIMSLite.Api.Models.Account;

namespace SIDIMSLite.Api.Models.Account
{
    public class ApplicationUser : IdentityUser
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public bool IsEnabled { get; set; }
    }
}