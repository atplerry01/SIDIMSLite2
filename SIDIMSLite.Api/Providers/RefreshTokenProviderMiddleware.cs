using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.EntityFrameworkCore;
using SIDIMSLite.Api.Models;
using SIDIMSLite.Api.Utils;
using SIDIMSLite.Api.Models.Account;
using SIDIMSLite.Api.Persistence;

namespace SIDIMSLite.Api.Providers
{
    public class RefreshTokenProviderMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly JsonSerializerSettings _serializerSettings;

        public RefreshTokenProviderMiddleware(
                    RequestDelegate next)
        {
            _next = next;

            _serializerSettings = new JsonSerializerSettings
            {
                Formatting = Formatting.Indented
            };
        }


        public Task Invoke(HttpContext context)
        {
            // If the request path doesn't match, skip
            if (!context.Request.Path.Equals("/api/refresh", StringComparison.Ordinal))
            {
                return _next(context);
            }

            // Request must be POST with Content-Type: application/x-www-form-urlencoded
            if (!context.Request.Method.Equals("POST")
               || !context.Request.HasFormContentType)
            {
                context.Response.StatusCode = 400;
                return context.Response.WriteAsync("Bad request.");
            }


            return GenerateToken(context);
        }

        private async Task GenerateToken(HttpContext context)
        {

            var db = context.RequestServices.GetService<ApplicationDbContext>();

            var refreshToken = context.Request.Form["refreshToken"].ToString();
            var clientId = context.Request.Form["client_id"].ToString();

            Client client = null;

            if (clientId == null || clientId == "")
            {
                context.Response.StatusCode = 400;
                await context.Response.WriteAsync("invalid_clientId, ClientId should be sent.");
                return;
            }

            //Find Client
            client = db.Clients.Find(clientId);

            if (client == null)
            {
                context.Response.StatusCode = 400;
                await context.Response.WriteAsync("invalid_clientId, Client '{0}' is not registered in the system.");
                return;
            }


            if (string.IsNullOrWhiteSpace(refreshToken))
            {
                context.Response.StatusCode = 400;
                await context.Response.WriteAsync("User must relogin.");
                return;
            }

            //var db = context.RequestServices.GetService<SecureIdContext>();
            var signInManager = context.RequestServices.GetService<SignInManager<ApplicationUser>>();
            var userManager = context.RequestServices.GetService<UserManager<ApplicationUser>>();

            var refreshTokenModel = db.RefreshTokens
                .Include(x => x.User)
                .SingleOrDefault(i => i.Token == refreshToken);

            if (refreshTokenModel == null)
            {
                context.Response.StatusCode = 400;
                await context.Response.WriteAsync("User must relogin.");
                return;
            }

            if (!await signInManager.CanSignInAsync(refreshTokenModel.User))
            {
                context.Response.StatusCode = 400;
                await context.Response.WriteAsync("User is unable to login.");
                return;
            }

            if (userManager.SupportsUserLockout && await userManager.IsLockedOutAsync(refreshTokenModel.User))
            {
                context.Response.StatusCode = 400;
                await context.Response.WriteAsync("User is locked out.");
                return;
            }

            var user = refreshTokenModel.User;
            var token = GetLoginToken.Execute(user, client, db, refreshTokenModel);
            context.Response.ContentType = "application/json";
            await context.Response.WriteAsync(JsonConvert.SerializeObject(token, _serializerSettings));
        }


    }

}