namespace SIDIMSLite.Api.ViewModel
{
    public class ClientUserModel
    {
        public int SidClientId { get; set; }
        public string ClientName { get; set; }
        public string UserId { get; set; }
        public bool ChangePassword { get; set; }
        public virtual ApplicationUserModel User { get; set; }
    }
}