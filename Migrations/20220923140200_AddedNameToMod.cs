using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ModHub.Migrations
{
    public partial class AddedNameToMod : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Name",
                table: "Mods",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Name",
                table: "Mods");
        }
    }
}
