using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MentorPlatform.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class AddSoftDeleteEntireEntities : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsDeleted",
                table: "UserExpertises",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "IsDeleted",
                table: "UserDetails",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "IsDeleted",
                table: "UserCourses",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "IsDeleted",
                table: "UserCourseCategories",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "IsDeleted",
                table: "Schedules",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "IsDeleted",
                table: "RefreshTokens",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "IsDeleted",
                table: "MentoringSessions",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "IsDeleted",
                table: "Expertise",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "IsDeleted",
                table: "CourseResources",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "IsDeleted",
                table: "ApplicationRequests",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "IsDeleted",
                table: "ApplicationDocuments",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsDeleted",
                table: "UserExpertises");

            migrationBuilder.DropColumn(
                name: "IsDeleted",
                table: "UserDetails");

            migrationBuilder.DropColumn(
                name: "IsDeleted",
                table: "UserCourses");

            migrationBuilder.DropColumn(
                name: "IsDeleted",
                table: "UserCourseCategories");

            migrationBuilder.DropColumn(
                name: "IsDeleted",
                table: "Schedules");

            migrationBuilder.DropColumn(
                name: "IsDeleted",
                table: "RefreshTokens");

            migrationBuilder.DropColumn(
                name: "IsDeleted",
                table: "MentoringSessions");

            migrationBuilder.DropColumn(
                name: "IsDeleted",
                table: "Expertise");

            migrationBuilder.DropColumn(
                name: "IsDeleted",
                table: "CourseResources");

            migrationBuilder.DropColumn(
                name: "IsDeleted",
                table: "ApplicationRequests");

            migrationBuilder.DropColumn(
                name: "IsDeleted",
                table: "ApplicationDocuments");
        }
    }
}
