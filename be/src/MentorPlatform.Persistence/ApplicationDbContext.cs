
using MentorPlatform.Domain.Entities;
using MentorPlatform.Domain.Repositories;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage;
using System.Data;
using System.Reflection;

namespace MentorPlatform.Persistence;

public class ApplicationDbContext : DbContext, IUnitOfWork
{
    private const string CanNotRollBackEmptyTransaction = "Cannot roll back empty transaction!";
    private const string CurrentTransactionNull = "Current transaction null";
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

    public ApplicationDbContext() { }
    private IDbContextTransaction? _transaction;

    public DbSet<User> Users { get; set; } = default!;
    public DbSet<RefreshToken> RefreshTokens { get; set; } = default!;
    private bool HasActiveTransaction => _transaction != null;


    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
        base.OnModelCreating(modelBuilder);
    }
    public async Task BeginTransactionAsync()
    {
        _transaction = await Database.BeginTransactionAsync(IsolationLevel.ReadCommitted);
    }

    public async Task RollbackAsync()
    {
        if (_transaction == null)
        {
            throw new ArgumentException(CanNotRollBackEmptyTransaction);
        }
        try
        {
            await _transaction!.RollbackAsync();
        }
        finally
        {
            if (HasActiveTransaction)
            {
                _transaction!.Dispose();
                _transaction = null;
            }
        }
    }

    public async Task CommitTransactionAsync()
    {
        if (_transaction == null)
        {
            throw new ArgumentException(CurrentTransactionNull);
        }
        try
        {
            await _transaction.CommitAsync();
        }
        catch
        {
            await RollbackAsync();
            throw;
        }
        finally
        {
            if (HasActiveTransaction)
            {
                _transaction.Dispose();
                _transaction = null;
            }
        }
    }
}