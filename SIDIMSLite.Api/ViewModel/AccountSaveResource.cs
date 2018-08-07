namespace SIDIMSClient.Api.ViewModel
{
    public class AccountSaveResource
    {
        public string Username { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string PhoneNumber { get; set; }
        public string Email { get; set; }

        public int SidClientId { get; set; }
    }
}