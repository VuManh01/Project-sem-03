using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Pomelo.EntityFrameworkCore.MySql.Scaffolding.Internal;
using project3api_be.Models;
namespace project3api_be.Data;

public partial class ApplicationDbContext : DbContext
{
    public ApplicationDbContext()
    {
    }

    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Account> Accounts { get; set; }
    public virtual DbSet<Book> Books { get; set; }
    public virtual DbSet<Discount> Discounts { get; set; }
    public virtual DbSet<Feedback> Feedbacks { get; set; }
    public virtual DbSet<ImageRecipe> ImageRecipes { get; set; }
    public virtual DbSet<MembershipService> MembershipServices { get; set; }
    public virtual DbSet<Order> Orders { get; set; }
    public virtual DbSet<Payment> Payments { get; set; }
    public virtual DbSet<OrderDetail> OrderDetails { get; set; }
    public virtual DbSet<OrderMembership> OrderMemberships { get; set; }
    public virtual DbSet<Token> Tokens { get; set; }
    public virtual DbSet<PaymentMember> PaymentMembers { get; set; }
    public virtual DbSet<Recipe> Recipes { get; set; }
    public virtual DbSet<Role> Roles { get; set; }
    public virtual DbSet<Subscription> Subscriptions { get; set; }



    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseMySql("server=prjsem3-aptech-temvtm.mysql.database.azure.com;database=projectsem3;user id=prjsem3admin;password=Aptech123", Microsoft.EntityFrameworkCore.ServerVersion.Parse("8.0.39-mysql"));

    protected override void OnModelCreating(ModelBuilder modelBuilder) { }


    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
