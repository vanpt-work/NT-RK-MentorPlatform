using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MentorPlatform.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class UpdateVersion : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UserCourseCategories_CourseCategories_CategoryId",
                table: "UserCourseCategories");

            migrationBuilder.RenameColumn(
                name: "CategoryId",
                table: "UserCourseCategories",
                newName: "CourseCategoryId");

            migrationBuilder.RenameIndex(
                name: "IX_UserCourseCategories_CategoryId",
                table: "UserCourseCategories",
                newName: "IX_UserCourseCategories_CourseCategoryId");

            migrationBuilder.AlterColumn<string>(
                name: "Email",
                table: "Users",
                type: "nvarchar(50)",
                maxLength: 50,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(100)",
                oldMaxLength: 100);

            migrationBuilder.AlterColumn<int>(
                name: "LearningStyle",
                table: "UserDetails",
                type: "int",
                maxLength: 200,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(200)",
                oldMaxLength: 200,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "FullName",
                table: "UserDetails",
                type: "nvarchar(200)",
                maxLength: 200,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(100)",
                oldMaxLength: 100);

            migrationBuilder.AddColumn<string>(
                name: "Availability",
                table: "UserDetails",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_UserCourseCategories_CourseCategories_CourseCategoryId",
                table: "UserCourseCategories",
                column: "CourseCategoryId",
                principalTable: "CourseCategories",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UserCourseCategories_CourseCategories_CourseCategoryId",
                table: "UserCourseCategories");

            migrationBuilder.DropColumn(
                name: "Availability",
                table: "UserDetails");

            migrationBuilder.RenameColumn(
                name: "CourseCategoryId",
                table: "UserCourseCategories",
                newName: "CategoryId");

            migrationBuilder.RenameIndex(
                name: "IX_UserCourseCategories_CourseCategoryId",
                table: "UserCourseCategories",
                newName: "IX_UserCourseCategories_CategoryId");

            migrationBuilder.AlterColumn<string>(
                name: "Email",
                table: "Users",
                type: "nvarchar(100)",
                maxLength: 100,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(50)",
                oldMaxLength: 50);

            migrationBuilder.AlterColumn<string>(
                name: "LearningStyle",
                table: "UserDetails",
                type: "nvarchar(200)",
                maxLength: 200,
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int",
                oldMaxLength: 200,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "FullName",
                table: "UserDetails",
                type: "nvarchar(100)",
                maxLength: 100,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(200)",
                oldMaxLength: 200);

            migrationBuilder.AddForeignKey(
                name: "FK_UserCourseCategories_CourseCategories_CategoryId",
                table: "UserCourseCategories",
                column: "CategoryId",
                principalTable: "CourseCategories",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
