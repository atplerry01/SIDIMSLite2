using Microsoft.EntityFrameworkCore.Migrations;

namespace SIDIMSLite.Api.Data.Migrations.ApplicationDb
{
    public partial class UpdateClientUser : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ClientName",
                table: "ClientUser",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ClientName",
                table: "ClientUser");
        }
    }
}
