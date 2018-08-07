using AutoMapper;
using SIDIMSLite.Api.Models;
using SIDIMSLite.Api.Models.Account;
using SIDIMSLite.Api.ViewModel;

namespace SIDIMSLite.Api.Mapping
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Stock, StockModel>();
            CreateMap<Stock, StockMap>();
            CreateMap<Stock, StockVaultModel>();
            CreateMap<Operations, OperationModel>();
            CreateMap<Mis, VaultModel>();
            CreateMap<Mis, MisVaultModel>();
            CreateMap<Mis, StockReportModel>();
            CreateMap<Clients, ClientModel>();

            CreateMap<ApplicationUser, ApplicationUserModel>();


            CreateMap<AccountUpdateResource, ApplicationUser>();
            CreateMap<ClientUserModel, ClientUser>();

        }
    }
}