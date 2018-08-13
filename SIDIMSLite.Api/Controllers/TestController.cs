using System.Net;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace SIDIMSLite.Api.Controllers
{
    [Route("api/test")]
    public class TestController : Controller
    {

        [HttpGet]
        public async Task<IActionResult> CreateLicenseAsync()
        {
            const string msg = "Unable to PUT license creation request";
            return StatusCode((int)HttpStatusCode.InternalServerError, msg);
        }

    }
}