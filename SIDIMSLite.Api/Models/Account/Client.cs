using System.ComponentModel.DataAnnotations;

namespace SIDIMSLite.Api.Models.Account
{
    public class Client
    {
        public Client()
        {
            IsPublic = true;
        }

        [Key]
        public string Id { get; set; }

        [Required]
        public string Secret { get; set; }

        [Required]
        [MaxLength(100)]
        public string Name { get; set; }
        public ApplicationTypes ApplicationType { get; set; }
        public bool Active { get; set; }
        public int RefreshTokenLifeTime { get; set; }

        [MaxLength(100)]
        public string AllowedOrigin { get; set; }

        public bool IsPublic { get; set; }
        //public int ClientProfileId { get; set; }

        //[ForeignKey("ClientProfileId")]
        //public virtual Application05ClientProfile ClientProfile { get; set; }

    }

}