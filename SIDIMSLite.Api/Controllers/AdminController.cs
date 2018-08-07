using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SIDIMSLite.Api.Models.Account;
using SIDIMSLite.Api.Persistence;
using SIDIMSLite.Api.ViewModel;

namespace SIDIMSLite.Api.Controllers
{
    [Route("api/admin")]
    public class AdminController : Controller
    {
        private readonly ApplicationDbContext context;
        private readonly IMapper mapper;
        public AdminController(ApplicationDbContext context, IMapper mapper)
        {
            this.mapper = mapper;
            this.context = context;
        }

        [HttpGet("users")]
        public async Task<IEnumerable<ApplicationUserModel>> GetClientStocks(int clientId)
        {
            var users = await context.Users.ToListAsync();
            return mapper.Map<IEnumerable<ApplicationUser>, IEnumerable<ApplicationUserModel>>(users);
        }



        [HttpGet("clientusers")]
        public async Task<IEnumerable<ClientUserModel>> GetClientUsers(int clientId)
        {
            var users = await context.ClientUsers.Include(u => u.User).ToListAsync();
            return mapper.Map<IEnumerable<ClientUser>, IEnumerable<ClientUserModel>>(users);
        }



    }
}