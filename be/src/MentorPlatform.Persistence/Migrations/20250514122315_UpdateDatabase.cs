using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MentorPlatform.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class UpdateDatabase : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ApplicationDocument_ApplicationRequest_ApplicationRequestId",
                table: "ApplicationDocument");

            migrationBuilder.DropForeignKey(
                name: "FK_ApplicationRequest_Users_UserId",
                table: "ApplicationRequest");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ApplicationRequest",
                table: "ApplicationRequest");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ApplicationDocument",
                table: "ApplicationDocument");

            migrationBuilder.RenameTable(
                name: "ApplicationRequest",
                newName: "ApplicationRequests");

            migrationBuilder.RenameTable(
                name: "ApplicationDocument",
                newName: "ApplicationDocuments");

            migrationBuilder.RenameIndex(
                name: "IX_ApplicationRequest_UserId",
                table: "ApplicationRequests",
                newName: "IX_ApplicationRequests_UserId");

            migrationBuilder.RenameIndex(
                name: "IX_ApplicationDocument_ApplicationRequestId",
                table: "ApplicationDocuments",
                newName: "IX_ApplicationDocuments_ApplicationRequestId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ApplicationRequests",
                table: "ApplicationRequests",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ApplicationDocuments",
                table: "ApplicationDocuments",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_ApplicationDocuments_ApplicationRequests_ApplicationRequestId",
                table: "ApplicationDocuments",
                column: "ApplicationRequestId",
                principalTable: "ApplicationRequests",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ApplicationRequests_Users_UserId",
                table: "ApplicationRequests",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ApplicationDocuments_ApplicationRequests_ApplicationRequestId",
                table: "ApplicationDocuments");

            migrationBuilder.DropForeignKey(
                name: "FK_ApplicationRequests_Users_UserId",
                table: "ApplicationRequests");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ApplicationRequests",
                table: "ApplicationRequests");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ApplicationDocuments",
                table: "ApplicationDocuments");

            migrationBuilder.RenameTable(
                name: "ApplicationRequests",
                newName: "ApplicationRequest");

            migrationBuilder.RenameTable(
                name: "ApplicationDocuments",
                newName: "ApplicationDocument");

            migrationBuilder.RenameIndex(
                name: "IX_ApplicationRequests_UserId",
                table: "ApplicationRequest",
                newName: "IX_ApplicationRequest_UserId");

            migrationBuilder.RenameIndex(
                name: "IX_ApplicationDocuments_ApplicationRequestId",
                table: "ApplicationDocument",
                newName: "IX_ApplicationDocument_ApplicationRequestId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ApplicationRequest",
                table: "ApplicationRequest",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ApplicationDocument",
                table: "ApplicationDocument",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_ApplicationDocument_ApplicationRequest_ApplicationRequestId",
                table: "ApplicationDocument",
                column: "ApplicationRequestId",
                principalTable: "ApplicationRequest",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ApplicationRequest_Users_UserId",
                table: "ApplicationRequest",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
