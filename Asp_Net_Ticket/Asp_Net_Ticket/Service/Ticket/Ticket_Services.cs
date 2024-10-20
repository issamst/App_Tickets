using Asp_Net_Ticket.Entity;  
using Asp_Net_Ticket.Dto.Ticket;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System.Collections.Generic;
using System.Threading.Tasks;
using Asp_Net_Ticket.Context;

namespace Asp_Net_Ticket.Service.Ticket
{
    public class Ticket_Services
    {
        private readonly AppDbContext _context;
        private readonly ILogger<Ticket_Services> _logger;

        public Ticket_Services(AppDbContext context, ILogger<Ticket_Services> logger)
        {
            _context = context;
            _logger = logger;
        }









        public async Task<List<TickeDb>> GetAllTickets()
        {
            return await _context.Tickets.ToListAsync();
        }

        public async Task<TickeDb> GetTicketById(int id)
        {
            return await _context.Tickets.FindAsync(id);
        }

        public async Task<bool> CreateTicket(Ticket_DTO ticketDto)
        {
            try
            {
                var ticket = new TickeDb
                {
                    Description = ticketDto.Description,
                    Status = ticketDto.Status,
                    DateCreated = DateTime.Now
                };

                _context.Tickets.Add(ticket);
                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error creating ticket: {ex.Message}");
                return false;
            }
        }

        public async Task<bool> UpdateTicket(int id, Ticket_DTO ticketDto)
        {
            try
            {
                var existingTicket = await _context.Tickets.FirstOrDefaultAsync(t => t.Id == id);
                if (existingTicket != null)
                {
                    existingTicket.Description = ticketDto.Description;
                    existingTicket.Status = ticketDto.Status;
                    existingTicket.DateChanged = DateTime.Now;

                    await _context.SaveChangesAsync();
                    return true;
                }
                return false;
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error updating ticket: {ex.Message}");
                return false;
            }
        }

        public async Task<bool> DeleteTicket(int id)
        {
            try
            {
                // Find the ticket to delete
                var ticket = await _context.Tickets.FindAsync(id);
                if (ticket != null)
                {
                    // Create a new Ticket_Delete entry
                    var ticketDelete = new Ticket_Delete
                    {
                        Ticket_Id = ticket.Id,
                        Description = ticket.Description,
                        Status = ticket.Status,
                        Date_Deleted = DateTime.Now // Record the current date and time of deletion
                    };

                    // Remove the ticket from the Tickets table
                   

                    // Add the ticket delete entry to the Ticket_Deletes table
                    _context.Ticket_Deletes.Add(ticketDelete);
                    _context.Tickets.Remove(ticket);
                    // Save changes to the database
                    await _context.SaveChangesAsync();
                    return true;
                }
                return false;
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error deleting ticket: {ex.Message}");
                return false;
            }
        }
        public async Task<List<Ticket_Delete>> GetAllTickets_Deleted()
        {
            return await _context.Ticket_Deletes.ToListAsync();
        }

        public async Task<bool> back_Ticket(int id)
        {
            try
            {
                var ticket = await _context.Ticket_Deletes.FindAsync(id);

                if (ticket == null)
                {
                    _logger.LogError($"Ticket with ID {id} not found");
                    return false;
                }

                // Create a new TickeDb instance from the Ticket_Delete entity
                var ticketToRestore = new TickeDb
                {
                   
                    Description = ticket.Description,
                    Status = ticket.Status,
                    DateCreated = DateTime.Now
                    // Include other properties here that you need to restore
                };
                _context.Ticket_Deletes.Remove(ticket);
              
                // Add the restored ticket to the Tickets DbSet
                _context.Tickets.Add(ticketToRestore);

                // Remove the deleted ticket from the Ticket_Deletes DbSet
                

                await _context.SaveChangesAsync();

                return true;
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error restoring ticket: {ex.Message}");
                return false;
            }
        }

        public async Task<bool> Ticket_Delete_Final(int id)
        {
            try
            {
                var ticket = await _context.Ticket_Deletes.FindAsync(id);

                if (ticket == null)
                {
                    _logger.LogError($"Ticket with ID {id} not found");
                    return false;
                }


                _context.Ticket_Deletes.Remove(ticket);

                await _context.SaveChangesAsync();

                return true;
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error restoring ticket: {ex.Message}");
                return false;
            }
        }


    }
}
