using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ModHub.Migrations
{
    public partial class AddRatingId : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "RatingId",
                table: "Mods",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Mods_RatingId",
                table: "Mods",
                column: "RatingId");

            migrationBuilder.AddForeignKey(
                name: "FK_Mods_ModRatings_RatingId",
                table: "Mods",
                column: "RatingId",
                principalTable: "ModRatings",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Mods_ModRatings_RatingId",
                table: "Mods");

            migrationBuilder.DropIndex(
                name: "IX_Mods_RatingId",
                table: "Mods");

            migrationBuilder.DropColumn(
                name: "RatingId",
                table: "Mods");
        }
    }
}
