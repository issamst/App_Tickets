using Asp_Net_Ticket.Entity;
using Microsoft.EntityFrameworkCore;

namespace Asp_Net_Ticket.Context
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<TickeDb> Tickets { get; set; }
        public DbSet<Ticket_Delete> Ticket_Deletes { get; set; }



    }
}
