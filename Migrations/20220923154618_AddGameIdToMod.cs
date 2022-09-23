using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ModHub.Migrations
{
    public partial class AddGameIdToMod : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Year",
                table: "Games");

            migrationBuilder.AddColumn<int>(
                name: "GameId",
                table: "Mods",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Mods_GameId",
                table: "Mods",
                column: "GameId");

            migrationBuilder.AddForeignKey(
                name: "FK_Mods_Games_GameId",
                table: "Mods",
                column: "GameId",
                principalTable: "Games",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Mods_Games_GameId",
                table: "Mods");

            migrationBuilder.DropIndex(
                name: "IX_Mods_GameId",
                table: "Mods");

            migrationBuilder.DropColumn(
                name: "GameId",
                table: "Mods");

            migrationBuilder.AddColumn<int>(
                name: "Year",
                table: "Games",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}
