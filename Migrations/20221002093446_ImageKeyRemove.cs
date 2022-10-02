using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ModHub.Migrations
{
    public partial class ImageKeyRemove : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ImageKey",
                table: "Mods");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ImageKey",
                table: "Mods",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
