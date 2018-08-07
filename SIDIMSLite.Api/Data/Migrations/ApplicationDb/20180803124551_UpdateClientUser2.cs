using Microsoft.EntityFrameworkCore.Migrations;

namespace SIDIMSLite.Api.Data.Migrations.ApplicationDb
{
    public partial class UpdateClientUser2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "ChangePassword",
                table: "ClientUser",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ChangePassword",
                table: "ClientUser");
        }
    }
}
