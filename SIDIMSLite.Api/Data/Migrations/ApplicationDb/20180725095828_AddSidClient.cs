using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace SIDIMSLite.Api.Data.Migrations.ApplicationDb
{
    public partial class AddSidClient : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ClientUser_Clients_ClientId",
                table: "ClientUser");

            migrationBuilder.DropTable(
                name: "Clients");

            migrationBuilder.RenameColumn(
                name: "ClientId",
                table: "ClientUser",
                newName: "SidClientId");

            migrationBuilder.RenameIndex(
                name: "IX_ClientUser_ClientId",
                table: "ClientUser",
                newName: "IX_ClientUser_SidClientId");

            migrationBuilder.CreateTable(
                name: "SidClient",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Name = table.Column<string>(nullable: true),
                    ShortCode = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SidClient", x => x.Id);
                });

            migrationBuilder.AddForeignKey(
                name: "FK_ClientUser_SidClient_SidClientId",
                table: "ClientUser",
                column: "SidClientId",
                principalTable: "SidClient",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ClientUser_SidClient_SidClientId",
                table: "ClientUser");

            migrationBuilder.DropTable(
                name: "SidClient");

            migrationBuilder.RenameColumn(
                name: "SidClientId",
                table: "ClientUser",
                newName: "ClientId");

            migrationBuilder.RenameIndex(
                name: "IX_ClientUser_SidClientId",
                table: "ClientUser",
                newName: "IX_ClientUser_ClientId");

            migrationBuilder.CreateTable(
                name: "Clients",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Client = table.Column<string>(nullable: true),
                    Country = table.Column<string>(nullable: true),
                    Date = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Clients", x => x.Id);
                });

            migrationBuilder.AddForeignKey(
                name: "FK_ClientUser_Clients_ClientId",
                table: "ClientUser",
                column: "ClientId",
                principalTable: "Clients",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
