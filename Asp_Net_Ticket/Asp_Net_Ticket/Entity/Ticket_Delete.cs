using System.ComponentModel.DataAnnotations;

namespace Asp_Net_Ticket.Entity
{
    public class Ticket_Delete
    {
        [Key]
        public int Id { get; set; }
        public int Ticket_Id { get; set; }
        public string Description { get; set; }
        public string Status { get; set; }
        public DateTime Date_Deleted { get; set; }
        
    }
}

