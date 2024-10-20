using System.ComponentModel.DataAnnotations;

namespace Asp_Net_Ticket.Entity
{
    public class TickeDb
    {

        [Key]
        public int Id { get; set; }

        public string Description { get; set; }
        public string Status { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime DateChanged { get; set; }
    }
}


