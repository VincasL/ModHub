using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ModHub.Migrations
{
    public partial class ratingfix : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Mods_ModRatings_RatingId",
                table: "Mods");

            migrationBuilder.DropIndex(
                name: "IX_Mods_RatingId",
                table: "Mods");

            migrationBuilder.AddColumn<double>(
                name: "Rating",
                table: "Mods",
                type: "float",
                nullable: false,
                defaultValue: 0.0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Rating",
                table: "Mods");

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
    }
}
