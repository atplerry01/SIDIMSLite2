using System;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using SIDIMSClient.Api.ViewModel;
using SIDIMSLite.Api.Models;
using SIDIMSLite.Api.Models.Account;
using SIDIMSLite.Api.Persistence;
using SIDIMSLite.Api.ViewModel;
using MimeKit;
using Microsoft.AspNetCore.Authorization;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace SIDIMSLite.Api.Controllers
{
    [Route("api/account")]
    public class AccountsController : Controller
    {
        private readonly UserManager<ApplicationUser> userManager;
        private readonly RoleManager<IdentityRole> roleManager;
        private readonly ApplicationDbContext context;
        private readonly AspectContext ctx;
        private readonly AspectContext aspect;
        private readonly IHostingEnvironment host;
        private readonly IMapper mapper;

        public AccountsController(IMapper mapper, UserManager<ApplicationUser> userManager, RoleManager<IdentityRole> roleManager, ApplicationDbContext context, AspectContext aspect, IHostingEnvironment host)
        {
            this.mapper = mapper;
            this.host = host;
            this.aspect = aspect;
            this.context = context;
            this.roleManager = roleManager;
            this.userManager = userManager;
        }

        public static string GeneratePassword(int lowercase, int uppercase, int numerics)
        {
            string lowers = "abcdefghijklmnopqrstuvwxyz";
            string uppers = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
            string number = "0123456789";

            Random random = new Random();

            string generated = "!";
            for (int i = 1; i <= lowercase; i++)
                generated = generated.Insert(
                    random.Next(generated.Length),
                    lowers[random.Next(lowers.Length - 1)].ToString()
                );

            for (int i = 1; i <= uppercase; i++)
                generated = generated.Insert(
                    random.Next(generated.Length),
                    uppers[random.Next(uppers.Length - 1)].ToString()
                );

            for (int i = 1; i <= numerics; i++)
                generated = generated.Insert(
                    random.Next(generated.Length),
                    number[random.Next(number.Length - 1)].ToString()
                );

            return generated.Replace("!", string.Empty);

        }


        [HttpPost("client/create")]
        public async Task<IActionResult> CreateClientUser([FromBody] AccountSaveResource model)
        {

            var client = aspect.Clients.Where(c => c.Id == model.SidClientId).SingleOrDefault();

            if (client == null)
            {
                return Content("Failed", "text/html");
            }

            var user = new ApplicationUser()
            {
                UserName = model.Username,
                Email = model.Email,
                EmailConfirmed = true,
                FirstName = model.FirstName,
                LastName = model.LastName,
                PhoneNumber = model.PhoneNumber,
                IsEnabled = true
            };

            String randomPassword = GeneratePassword(3, 3, 3);
            randomPassword = "SidClient01";

            var result = await userManager.CreateAsync(user, randomPassword);

            if (result.Succeeded)
            {

                string[] userRole = new string[] { "Client" };
                var assignRoles = await DirectAssignRolesToUser(user.Id, userRole);

                // create user client
                var userClient = new ClientUser()
                {
                    SidClientId = model.SidClientId,
                    ClientName = client.Client,
                    UserId = user.Id
                };

                context.ClientUsers.Add(userClient);
                await context.SaveChangesAsync();


                #region EmailSender

                var uploadFolderPath = Path.Combine(host.WebRootPath, "templates/email-template");
                if (Directory.Exists(uploadFolderPath))
                    Directory.CreateDirectory(uploadFolderPath);

                var fileName = "Confirm_Account_Registration.html"; //Guid.NewGuid().ToString() + Path.GetExtension(file.FileName);
                var filePath = Path.Combine(uploadFolderPath, fileName);

                var builder = new BodyBuilder();

                using (StreamReader SourceReader = System.IO.File.OpenText(filePath))
                {
                    builder.HtmlBody = SourceReader.ReadToEnd();
                }

                var code = await userManager.GenerateEmailConfirmationTokenAsync(user);


                // Send Email Address
                var subject = "SIDIMSLite Account Creation";
                var Email = user.Email;
                var Password = randomPassword;
                var Message = "Messaage End";
                var callbackUrl = "http://localhost:3000/account/ConfirmEmail?userId=" + user.Id + "&code=" + code;

                //var callbackUrl = new Uri(Url.Link("ConfirmEmailRoute", new { userId = user.Id, code = code }));
                // Url.Page("/Account/ConfirmEmail"
                var callbackUrl2 = Url.Page("/Account/ConfirmEmail",
                        pageHandler: null,
                        values: new { userId = user.Id, code = code },
                        protocol: Request.Scheme);

                string messageBody = string.Format(builder.HtmlBody,
                       subject,
                       String.Format("{0:dddd, d MMMM yyyy}", DateTime.Now),
                       Email, //user.FirstName + " " + user.LastName,
                       user.UserName,
                       Password,
                       Message,
                       callbackUrl,
                       user.FirstName + " " + user.LastName
                       );

                /////////////////////////

                var mailMessage = new MailMessage
                {
                    From = new MailAddress("lakinsanya@secureidltd.com"),
                    Subject = subject,
                    IsBodyHtml = true,
                    Body = messageBody
                };

                mailMessage.To.Add(Email);

                var smtpClient = new SmtpClient
                {
                    Credentials = new NetworkCredential("lakinsanya@secureidltd.com", "Whycespace@01"),
                    Host = "smtp.secureidltd.com",
                    Port = 587
                };

                smtpClient.Send(mailMessage);

                #endregion

            }
            else
            {
                return Content("Failed", "text/html");
            }

            return Content("Successful", "text/html");
        }

        [HttpPost("manager/create")]
        public async Task<IActionResult> CreateManagerUser([FromBody] AccountSaveResource model)
        {

            var user = new ApplicationUser()
            {
                UserName = model.Username,
                Email = model.Email,
                EmailConfirmed = true,
                FirstName = model.FirstName,
                LastName = model.LastName,
                PhoneNumber = model.PhoneNumber,
                IsEnabled = true
            };

            String randomPassword = GeneratePassword(3, 3, 3);
            randomPassword = "SidClient01";

            var result = await userManager.CreateAsync(user, randomPassword);

            if (result.Succeeded)
            {

                string[] userRole = new string[] { "Manager" };
                var assignRoles = await DirectAssignRolesToUser(user.Id, userRole);

                #region EmailSender

                var uploadFolderPath = Path.Combine(host.WebRootPath, "templates/email-template");
                if (Directory.Exists(uploadFolderPath))
                    Directory.CreateDirectory(uploadFolderPath);

                var fileName = "Confirm_Account_Registration.html"; //Guid.NewGuid().ToString() + Path.GetExtension(file.FileName);
                var filePath = Path.Combine(uploadFolderPath, fileName);

                var builder = new BodyBuilder();

                using (StreamReader SourceReader = System.IO.File.OpenText(filePath))
                {
                    builder.HtmlBody = SourceReader.ReadToEnd();
                }

                var code = await userManager.GenerateEmailConfirmationTokenAsync(user);


                // Send Email Address
                var subject = "SIDIMSLite Account Creation";
                var Email = user.Email;
                var Password = randomPassword;
                var Message = "Messaage End";
                var callbackUrl = "http://localhost:3000/account/ConfirmEmail?userId=" + user.Id + "&code=" + code;

                //var callbackUrl = new Uri(Url.Link("ConfirmEmailRoute", new { userId = user.Id, code = code }));
                // Url.Page("/Account/ConfirmEmail"
                var callbackUrl2 = Url.Page("/Account/ConfirmEmail",
                        pageHandler: null,
                        values: new { userId = user.Id, code = code },
                        protocol: Request.Scheme);

                string messageBody = string.Format(builder.HtmlBody,
                       subject,
                       String.Format("{0:dddd, d MMMM yyyy}", DateTime.Now),
                       Email, //user.FirstName + " " + user.LastName,
                       user.UserName,
                       Password,
                       Message,
                       callbackUrl,
                       user.FirstName + " " + user.LastName
                       );

                /////////////////////////

                var mailMessage = new MailMessage
                {
                    From = new MailAddress("lakinsanya@secureidltd.com"),
                    Subject = subject,
                    IsBodyHtml = true,
                    Body = messageBody
                };

                mailMessage.To.Add(Email);

                var smtpClient = new SmtpClient
                {
                    Credentials = new NetworkCredential("lakinsanya@secureidltd.com", "Whycespace@01"),
                    Host = "smtp.secureidltd.com",
                    Port = 587
                };

                smtpClient.Send(mailMessage);

                #endregion

            }
            else
            {
                return Content("Failed", "text/html");
            }

            return Content("Successful", "text/html");
        }




        [HttpPost("client/update")]
        public async Task<IActionResult> UpdateClientUser([FromBody] AccountUpdateResource model)
        {

            var user = await userManager.FindByIdAsync(model.UserId);

            user.FirstName = model.FirstName;
            user.LastName = model.LastName;
            user.Email = model.Email;
            user.PhoneNumber = model.PhoneNumber;

            var result = await userManager.UpdateAsync(user);

            if (!result.Succeeded)
            {
                return Content("Failed", "text/html");
            }

            return Content("Successful", "text/html");
        }

        [HttpPost("ConfirmEmail")]
        public async Task<IActionResult> ConfirmEmail(string userId = "", string code = "")
        {

            if (string.IsNullOrWhiteSpace(userId) || string.IsNullOrWhiteSpace(code))
            {
                ModelState.AddModelError("", "User Id and Code are required");
                return BadRequest(ModelState);
            }

            var user = await userManager.FindByIdAsync(userId);

            IdentityResult result = await userManager.ConfirmEmailAsync(user, code);

            if (result.Succeeded)
            {
                //return Ok();
                return Content("Sucessful", "text/html");
            }
            else
            {
                return Content("Failed", "text/html");
            }

        }

        [HttpPost("ChangePassword")]
        public async Task<IActionResult> ChangePassword([FromBody] ChangePasswordModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = await userManager.FindByNameAsync(model.UserId);

            // Verify the Old Password
            var identity = await userManager.CheckPasswordAsync(user, model.OldPassword); //GetClaimsIdentity(user.UserName, model.OldPassword);

            if (identity == false)
            {
                return BadRequest(ModelState);
            }

            var token = await userManager.GeneratePasswordResetTokenAsync(user);
            var result = await userManager.ResetPasswordAsync(user, token, model.NewPassword);

            if (result.Succeeded)
            {
                // Update Client User
                var clientUser = await context.ClientUsers
                    .SingleOrDefaultAsync(u => u.UserId == user.Id);

                clientUser.ChangePassword = true;

                if (clientUser == null) return NotFound();

                context.Entry(clientUser).State = EntityState.Modified;
                await context.SaveChangesAsync();

                return Ok(clientUser);
            }
            else
            {
                return Content("Failed", "text/html");
                //return StatusCode(Microsoft.AspNetCore.Http.StatusCodes.Status500InternalServerError);
            }

            //return Ok();
            //return Ok(clientUser); //Content("Success", "text/html");
        }

        [HttpPost("ForgotPassword")]
        public async Task<IActionResult> ForgotPassword([FromBody] ForgotPasswordModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = await userManager.FindByEmailAsync(model.Email);
            String randomPassword = GeneratePassword(3, 3, 3);
            randomPassword = "SidClient@01";

            var token = await userManager.GeneratePasswordResetTokenAsync(user);
            var result = await userManager.ResetPasswordAsync(user, token, randomPassword);

            // Update Client User
            var clientUser = await context.ClientUsers
                .SingleOrDefaultAsync(u => u.UserId == user.Id);

            clientUser.ChangePassword = false;

            if (clientUser == null)
            {

            } //return NotFound();

            context.Entry(clientUser).State = EntityState.Modified;
            await context.SaveChangesAsync();

            #region EmailSender

            var uploadFolderPath = Path.Combine(host.WebRootPath, "templates/email-template");
            if (Directory.Exists(uploadFolderPath))
                Directory.CreateDirectory(uploadFolderPath);

            var fileName = "PasswordRecovery.html";
            var filePath = Path.Combine(uploadFolderPath, fileName);

            var builder = new BodyBuilder();

            using (StreamReader SourceReader = System.IO.File.OpenText(filePath))
            {
                builder.HtmlBody = SourceReader.ReadToEnd();
            }

            //var code = await userManager.GenerateEmailConfirmationTokenAsync(user);


            // Send Email Address
            var subject = "SIDIMSLite Password Recovery";
            var Email = user.Email;
            var Password = randomPassword;
            var Message = "Message End";
            var callbackUrl = "http://localhost:3000/account/ConfirmEmail?userId="; //+ user.Id + "&code=" + code

            // var callbackUrl2 = Url.Page("/Account/ConfirmEmail",
            //         pageHandler: null,
            //         values: new { userId = user.Id, code = code },
            //         protocol: Request.Scheme);

            string messageBody = string.Format(builder.HtmlBody,
                   subject,
                   String.Format("{0:dddd, d MMMM yyyy}", DateTime.Now),
                   Email,
                   user.UserName,
                   Password,
                   Message,
                   callbackUrl,
                   user.FirstName + " " + user.LastName
                   );

            /////////////////////////

            var mailMessage = new MailMessage
            {
                From = new MailAddress("lakinsanya@secureidltd.com"),
                Subject = subject,
                IsBodyHtml = true,
                Body = messageBody
            };

            mailMessage.To.Add(Email);

            var smtpClient = new SmtpClient
            {
                Credentials = new NetworkCredential("lakinsanya@secureidltd.com", "Whycespace@01"),
                Host = "smtp.secureidltd.com",
                Port = 587
            };

            smtpClient.Send(mailMessage);

            #endregion

            return Ok();

        }


        [Route("user/{id:guid}")]
        public async Task<IActionResult> GetUser([FromRoute] string id)
        {

            var appUser = await userManager.FindByIdAsync(id);

            if (appUser == null)
            {
                return NotFound();
            }

            var result = mapper.Map<ApplicationUser, ApplicationUserModel>(appUser);

            return Ok(result);
        }


        [Route("user/{id:guid}/delete")]
        public async Task<IActionResult> DeleteUser(string id)
        {

            //Only SuperAdmin or Admin can delete users (Later when implement roles)

            var appUser = await userManager.FindByIdAsync(id);

            if (appUser != null)
            {
                IdentityResult result = await userManager.DeleteAsync(appUser);

                if (!result.Succeeded)
                {
                    return Content("Failed", "text/html");
                }

                return Ok();

            }

            return NotFound();

        }






        [HttpPost("admin/create")]
        public async Task<IActionResult> AdminClientUser([FromBody] AccountSaveResource model)
        {

            var user = new ApplicationUser()
            {
                UserName = model.Username,
                Email = model.Email,
                EmailConfirmed = true,
                FirstName = model.FirstName,
                LastName = model.LastName,
                PhoneNumber = model.PhoneNumber,
                IsEnabled = true
            };

            var result = await userManager.CreateAsync(user, "SidClient01");

            if (result.Succeeded)
            {
                string[] userRole = new string[] { "Admin" };
                var assignRoles = await DirectAssignRolesToUser(user.Id, userRole);
            }
            else
            {
                return Content("Failed", "text/html");
            }

            return Content("Successful", "text/html");
        }

        public async Task<IActionResult> DirectAssignRolesToUser(string id, string[] rolesToAssign)
        {

            var appUser = await this.userManager.FindByIdAsync(id);

            if (appUser == null)
            {
                return NotFound();
            }

            var currentRoles = await this.userManager.GetRolesAsync(appUser);

            IdentityResult addResult = await this.userManager.AddToRolesAsync(appUser, rolesToAssign);

            if (!addResult.Succeeded)
            {
                //
            }

            return Ok();
        }

        [HttpPost("create")]
        public async Task<IActionResult> Create(AccountSaveResource accountModel)
        {

            var user = new ApplicationUser() { UserName = "atplerry", Email = "atplerry@gmail.com", IsEnabled = true, EmailConfirmed = true, FirstName = "Akinsanya", LastName = "Olanrewaju" };
            var result = await userManager.CreateAsync(user, "SidClient@01");

            if (roleManager.Roles.Count() == 0)
            {
                await roleManager.CreateAsync(new IdentityRole { Name = "Admin" });
                await roleManager.CreateAsync(new IdentityRole { Name = "Client" });
                await roleManager.CreateAsync(new IdentityRole { Name = "Inventory" });
                await roleManager.CreateAsync(new IdentityRole { Name = "Manager" });
            }

            //var u = await userManager.FindByNameAsync("admin");
            var user1 = await userManager.FindByNameAsync("atplerry");
            await userManager.AddToRolesAsync(user1, new string[] { "Admin", "Client", "Inventory", "Manager" });

            return Content("Success", "text/html");

        }


        [HttpPost("create-manager")]
        public async Task<IActionResult> CreateManager(AccountSaveResource accountModel)
        {

            await roleManager.CreateAsync(new IdentityRole { Name = "Manager" });
            return Content("Success", "text/html");

        }

        public async Task<IActionResult> ResetPassword(PasswordResetModel model)
        {

            //var code = await userManager.GenerateEmailConfirmationTokenAsync();

            var user = new ApplicationUser() { UserName = "atplerry", Email = "atplerry@gmail.com", IsEnabled = true, EmailConfirmed = true, FirstName = "Akinsanya", LastName = "Olanrewaju" };
            var result = await userManager.CreateAsync(user, "akinlanre@01");

            if (roleManager.Roles.Count() == 0)
            {
                await roleManager.CreateAsync(new IdentityRole { Name = "Admin" });
                await roleManager.CreateAsync(new IdentityRole { Name = "Client" });
                await roleManager.CreateAsync(new IdentityRole { Name = "Inventory" });
            }

            //var u = await userManager.FindByNameAsync("admin");
            var user1 = await userManager.FindByNameAsync("atplerry");
            await userManager.AddToRolesAsync(user1, new string[] { "Admin", "Client", "Inventory" });

            return Content("Success", "text/html");

        }

        [HttpPost("create-roles")]
        public async Task<IActionResult> CreateRoles()
        {


            if (roleManager.Roles.Count() == 0)
            {
                await roleManager.CreateAsync(new IdentityRole { Name = "Admin" });
                await roleManager.CreateAsync(new IdentityRole { Name = "Client" });
                await roleManager.CreateAsync(new IdentityRole { Name = "Inventory" });
                await roleManager.CreateAsync(new IdentityRole { Name = "Manager" });
            }


            return Content("Success", "text/html");

        }


    }
}