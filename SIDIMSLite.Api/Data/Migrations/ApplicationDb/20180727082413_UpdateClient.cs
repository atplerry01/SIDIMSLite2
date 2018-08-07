using Microsoft.EntityFrameworkCore.Migrations;

namespace SIDIMSLite.Api.Data.Migrations.ApplicationDb
{
    public partial class UpdateClient : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ClientUser_SidClient_SidClientId",
                table: "ClientUser");

            migrationBuilder.DropIndex(
                name: "IX_ClientUser_SidClientId",
                table: "ClientUser");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_ClientUser_SidClientId",
                table: "ClientUser",
                column: "SidClientId");

            migrationBuilder.AddForeignKey(
                name: "FK_ClientUser_SidClient_SidClientId",
                table: "ClientUser",
                column: "SidClientId",
                principalTable: "SidClient",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
