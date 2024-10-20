using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using Asp_Net_Ticket.Service.Ticket;
using Asp_Net_Ticket.Dto.Ticket;
using Microsoft.Extensions.Logging;
using Asp_Net_Ticket.Entity;

namespace Asp_Net_Ticket.Controllers.Ticket
{
    [Route("api/[controller]")]
    [ApiController]
    public class Ticket_Controllers : ControllerBase
    {
        private readonly Ticket_Services _ticketService;
        private readonly ILogger<Ticket_Controllers> _logger;

        public Ticket_Controllers(Ticket_Services ticketService, ILogger<Ticket_Controllers> logger)
        {
            _ticketService = ticketService;
            _logger = logger;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<TickeDb>>> GetAllTickets()
        {
            try
            {
                var tickets = await _ticketService.GetAllTickets();
                return Ok(tickets);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error retrieving tickets: {ex.Message}");
                return BadRequest(new { ex.Message });
            }
        }
        [HttpGet("Ticket_Deleted")]
        public async Task<ActionResult<IEnumerable<TickeDb>>> GetAllTickets_Deleted()
        {
            try
            {
                var tickets = await _ticketService.GetAllTickets_Deleted();
                return Ok(tickets);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error retrieving tickets: {ex.Message}");
                return BadRequest(new { ex.Message });
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<TickeDb>> GetTicketById(int id)
        {
            try
            {
                var ticket = await _ticketService.GetTicketById(id);
                if (ticket != null)
                {
                    return Ok(ticket);
                }
                return NotFound("Ticket not found");
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error retrieving ticket by ID: {ex.Message}");
                return BadRequest(new { ex.Message });
            }
        }

        [HttpPost]
        public async Task<ActionResult> CreateTicket(Ticket_DTO ticket)
        {
            try
            {
                var success = await _ticketService.CreateTicket(ticket);
                if (success)
                {
                    return Ok(new { Message = "Ticket created successfully" });
                }
                return BadRequest("Error creating ticket");
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error creating ticket: {ex.Message}");
                return BadRequest(new { ex.Message });
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTicket(int id, Ticket_DTO ticket)
        {
            try
            {
                var success = await _ticketService.UpdateTicket(id, ticket);
                if (success)
                {
                    return Ok(new { Message = "Ticket updated successfully" });
                }
                return NotFound("Ticket not found");
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error updating ticket: {ex.Message}");
                return BadRequest(new { ex.Message });
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTicket(int id)
        {
            try
            {
                var success = await _ticketService.DeleteTicket(id);
                if (success)
                {
                    return Ok(new { Message = "Ticket deleted successfully" });
                }
                return NotFound("Ticket not found");
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error deleting ticket: {ex.Message}");
                return BadRequest(new { ex.Message });
            }
        }

        [HttpPost("back_Ticket/{id}")]
        public async Task<IActionResult> back_Ticket(int id)
        {
            try
            {
                _logger.LogInformation($"Attempting to restore ticket with ID: {id}");
                var success = await _ticketService.back_Ticket(id);

                if (success)
                {
                    return Ok(new { Message = "Ticket restored successfully" });
                }

                _logger.LogWarning($"Ticket with ID {id} not found in Ticket_Deletes.");
                return NotFound("Ticket not found");
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error restoring ticket: {ex.Message}");
                return BadRequest(new { ex.Message });
            }
        }

        [HttpDelete("Ticket_Delete_Final/{id}")]
        public async Task<IActionResult> Ticket_Delete_Final(int id)
        {
            try
            {
                var success = await _ticketService.Ticket_Delete_Final(id);
                if (success)
                {
                    return Ok(new { Message = "Ticket deleted successfully" });
                }
                return NotFound("Ticket not found");
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error deleting ticket: {ex.Message}");
                return BadRequest(new { ex.Message });
            }
        }
    }
}
