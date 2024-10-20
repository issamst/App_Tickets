import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { TicketService } from '../../services/ticket.service';


@Component({
selector: 'app-ticket',
templateUrl: './ticket.component.html',
styleUrl: './ticket.component.css'
})
export class TicketComponent implements OnInit {


AddTickets!: FormGroup;
UpdateTicket!: FormGroup;
ViewTicket!: FormGroup;

currentPageTicket: number = 1;
TicketPerPage: number = 5; 
sortDirection: number = 1;


Tickets:any=[];
Tickets_Deletes:any=[];
selectedTicketId: any = null;


public searchtext: string = '';
formattedDate: string = '';
sortBy: string = '';


isUserOverlayOpen: boolean = false;
isActive: boolean = false;
isActiveC: boolean = false;


showColumns = {
  Ticket_Id: true,
  Description: true,
  Status: true,
  Created_Date: true,
  Modification_Date : false,
  Deleted_Date:true
};  


constructor(
  private fb: FormBuilder,
  private TicketService:TicketService
) { }


ngOnInit() {

  this.UpdateTicket = this.fb.group({
    description: ['', Validators.required],
    status: ['', Validators.required],
    dateCreated:['', Validators.required]
  });

  this.ViewTicket = this.fb.group({
    id: ['', Validators.required],
    description: ['', Validators.required],
    status: ['', Validators.required],
    dateCreated:['', Validators.required],
    dateChanged: ['', Validators.required],
  });

  this.AddTickets = this.fb.group({
    description: ['', Validators.required],
    status: ['', Validators.required]
  });

  this.TicketService.getAllTickets().subscribe((res) => {
    this.Tickets = res;
  });
  this.TicketService.GetTicket_delete().subscribe(
    (res) => {
        this.Tickets_Deletes = res;
    },
    (err) => {
        console.error('Error fetching deleted tickets:', err);
    });


}

changeButtonColor() {
  this.isActive = !this.isActive;
}

changeButtonColorC() {
  this.isActiveC = !this.isActiveC;
}

onClose() {
  this.isActive =false;
  this.isActiveC =false;
  this.AddTickets.reset();
  this.UpdateTicket.reset();
}
onClear() {
  this.isActive =false;
  this.isActiveC =false;
  this.AddTickets.reset();
  this.UpdateTicket.reset();
}


toggleDropdown() {
  this.isUserOverlayOpen = !this.isUserOverlayOpen;
}

sortData(columnName: string) {
  console.log("columnName   : => ",columnName);
  if (this.sortBy === columnName) {
    // Reverse sort direction if same column is clicked again
    this.sortDirection = this.sortDirection === 1 ? -1 : 1;
  } else {
    // Set new column to sort and reset sort direction
    this.sortBy = columnName;
    this.sortDirection = 1;
  }

  // Sort the data based on the selected column and direction
  this.Tickets.sort((a:any, b:any) => {
    if (a[columnName] < b[columnName]) return -1 * this.sortDirection;
    if (a[columnName] > b[columnName]) return 1 * this.sortDirection;
    return 0;
  });
}


changePageTicket(page: number): void {
  this.currentPageTicket = page;
}

nextPageTicket(): void {
  if (this.currentPageTicket < this.totalPagesTicket) {
    this.currentPageTicket++;
  }
}

prevPageTicket(): void {
  if (this.currentPageTicket > 1) {
    this.currentPageTicket--;
  }
}

getDisplayedTicket(): any[] {
  const startIndex = (this.currentPageTicket - 1) * this.TicketPerPage;
  const endIndex = Math.min(startIndex + this.TicketPerPage, this.Tickets.length);
  return this.Tickets.slice(startIndex, endIndex);
}

get totalTicket():number{
  return this.Tickets.length;
}
get totalPagesTicket(): number {
  return Math.ceil(this.totalTicket / this.TicketPerPage);
  
}


get pagesTicket(): number[] {
  const pagesArray = [];
  for (let i = 1; i <= this.totalPagesTicket; i++) {
    pagesArray.push(i);
  }
  return pagesArray;
}



openModel() {
  const modal = document.getElementById("AddTicket");
  if (modal != null) {
    modal.classList.add('show'); // Add 'show' class to display the modal
    modal.style.display = 'block';
  }

  // Add event listener to the close button
  const closeButton = document.querySelector('.modal-footer .btn-danger');
  if (closeButton != null) {
    closeButton.addEventListener('click', () => {
      if (modal != null) {
        modal.classList.remove('show'); // Remove 'show' class to hide the modal
        modal.style.display = 'none';
      }
    });
  }

  // Add event listener to the modal backdrop to close the modal when clicked outside the modal
  const modalBackdrop = document.querySelector('.modal-backdrop');
  if (modalBackdrop != null) {
    modalBackdrop.addEventListener('click', () => {
      if (modal != null) {
        modal.classList.remove('show'); // Remove 'show' class to hide the modal
        modal.style.display = 'none';
      }
    });
  }

  // Add event listener to the close button in the modal header
  const modalCloseButton = document.querySelector('.modal-header .btn-close');
  if (modalCloseButton != null) {
    modalCloseButton.addEventListener('click', () => {
      if (modal != null) {
        modal.classList.remove('show'); // Remove 'show' class to hide the modal
        modal.style.display = 'none';
      }
    });
  }
}

openModelUpdate(userId: any) {
  
  this.selectedTicketId = userId;  
  
console.log("selection id :", this.selectedTicketId );
console.log("user  id :", userId );
  // Get the modal element
  const modal = document.getElementById("updateTicketModule");
  console.log(userId);
  if (modal != null) {
    
      // Set the user ID in the modal
      // For example, if you have an input field with id="userId" in the modal, you can set its value
      const userIdInput = modal.querySelector('#userId');
      if (userIdInput != null) {
          userIdInput.setAttribute('value', userId);
      }

      // Show the modal
      modal.classList.add('show');
      modal.style.display = 'block';
      
      // Add event listeners to close the modal
      const modalCloseButton = modal.querySelector('.modal-header .btn-close');
      if (modalCloseButton != null) {
          modalCloseButton.addEventListener('click', () => {
              modal.classList.remove('show');
              modal.style.display = 'none';
          });
      }

      const closeButton = modal.querySelector('.modal-footer .btn-danger');
      if (closeButton != null) {
          closeButton.addEventListener('click', () => {
              modal.classList.remove('show');
              modal.style.display = 'none';
          });
      }

      const modalBackdrop = modal.querySelector('.modal-backdrop');
      if (modalBackdrop != null) {
          modalBackdrop.addEventListener('click', () => {
              modal.classList.remove('show');
              modal.style.display = 'none';
          });
      }
  }
}

openModelView(TicketId: any) {
  
  this.selectedTicketId =TicketId;  
  
console.log("selection id :", this.selectedTicketId );
console.log("user  id :", TicketId );
  // Get the modal element
  const modal = document.getElementById("ViewTicketModule");
  console.log(TicketId);
  if (modal != null) {
    
      // Set the user ID in the modal
      // For example, if you have an input field with id="userId" in the modal, you can set its value
      const userIdInput = modal.querySelector('#ViewTicketModule');
      if (userIdInput != null) {
          userIdInput.setAttribute('value', TicketId);
      }

      // Show the modal
      modal.classList.add('show');
      modal.style.display = 'block';
      
      // Add event listeners to close the modal
      const modalCloseButton = modal.querySelector('.modal-header .btn-close');
      if (modalCloseButton != null) {
          modalCloseButton.addEventListener('click', () => {
              modal.classList.remove('show');
              modal.style.display = 'none';
          });
      }

      const closeButton = modal.querySelector('.modal-footer .btn-danger');
      if (closeButton != null) {
          closeButton.addEventListener('click', () => {
              modal.classList.remove('show');
              modal.style.display = 'none';
          });
      }

      const modalBackdrop = modal.querySelector('.modal-backdrop');
      if (modalBackdrop != null) {
          modalBackdrop.addEventListener('click', () => {
              modal.classList.remove('show');
              modal.style.display = 'none';
          });
      }
  }
}


formatDate(dateString: string): string {
const date = new Date(dateString);
const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: '2-digit' };
const formattedDate = date.toLocaleDateString('en-US', options);

// Split the formatted date into parts and reformat it
const [month, day, year] = formattedDate.split(' ');
return `${month}-${day.replace(',', '')}-${year}`; // "May-29-2024"
}

//CUD

SaveTicket() {
  if (this.AddTickets.valid) { // Check if the signup form is valid
    this.TicketService.createTicket(this.AddTickets.value).subscribe({
      next: (res) => {
        Swal.fire('Success', 'Ticket Created Successfully!', 'success').then((res) => {
          window.location.reload();
        });
        // Optionally, you can reset the form after successful signup
        this.AddTickets.reset();
        
        const modal = document.getElementById("myModal");
        if (modal != null) {
          modal.classList.remove('show');
          modal.style.display = 'none';
        }
      },
      error: (err) => {
        console.error('Error:', err);
        Swal.fire('Error', 'Failed to Create Ticket. Please try again.', 'error');
      },
    });
  } else {
    // Show validation error if the signup form is invalid
    Swal.fire('Error', 'Please provide valid Ticket information', 'warning');
  }
}

updateTicket(TicketId: number, updatedTicketData: any) {
  if (TicketId !== null && this.UpdateTicket.valid) {
    this.TicketService.updateTicket(TicketId, updatedTicketData).subscribe({
      next: (response) => {
        Swal.fire('Success', 'Ticket updated successfully' , 'success').then((res) => {
          window.location.reload();
        });
      },
      error: (error) => {
        Swal.fire('Error', 'Error updating ticket:', 'error');
        this.UpdateTicket.reset();
    
        const modal = document.getElementById("myModal");
        if (modal != null) {
          modal.classList.remove('show');
          modal.style.display = 'none';
        }
      }
    });
  } else {
    // Handle null TicketId or form validation errors
    console.error('Ticket ID is null or form is invalid');
    Swal.fire('Error', 'An error occurred while updating the Ticket', 'error');
  }
}

DeleteTicket(TicketId: number) {
  // Assuming you have a confirmation dialog before deleting the user
  Swal.fire({
    title: 'Are you sure?',
    text: 'You will not be able to recover this Ticket!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'No, keep it'
  }).then((result) => {
    if (result.isConfirmed) {
      this.TicketService.deleteTicket(TicketId).subscribe({
        next: (res) => {
          // Handle success response
          Swal.fire('Deleted!', 'The ticket is moved To Deleted Tickets..', 'success').then((res) => {
            window.location.reload();
          });
          // Optionally, you can refresh the user list or perform any other action
        },
        error: (err) => {
          // Handle error response
          console.error('Error:', err);
          Swal.fire('Error', 'An error occurred while deleting the ticket.', 'error');
        }
      });
    }
  });
}



//back_Ticket
back_Ticket(TicketId: number) {
  // Confirmation dialog before backing up the ticket
  Swal.fire({
    title: 'Are you sure?',
    text: 'You will be able to recover this ticket!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, back it up!',
    cancelButtonText: 'No, keep it'
  }).then((result) => {
    if (result.isConfirmed) {
      this.TicketService.back_Ticket(TicketId).subscribe({
        next: (res) => {
          // Handle success response
          Swal.fire('Success!', 'Ticket has been backed up.', 'success').then((res) => {
            window.location.reload();
          });
        },
        error: (err) => {
          // Handle error response
          console.error('Error:', err);
          Swal.fire('Error', 'An error occurred while backing up the ticket', 'error');
        }
      });
    }
  });
}

Ticket_Delete_Final(TicketId: number) {
  // Confirmation dialog before deleting the ticket
  Swal.fire({
    title: 'Are you sure?',
    text: 'You will not be able to recover this ticket!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, delete it permanently !!',
    cancelButtonText: 'No, keep it'
  }).then((result) => {
    if (result.isConfirmed) {
      this.TicketService.Ticket_Delete_Final(TicketId).subscribe({
        next: (res) => {
          // Handle success response
          Swal.fire('Deleted!', 'Ticket has been deleted.', 'success').then((res) => {
            window.location.reload();
          });
        },
        error: (err) => {
          // Handle error response
          console.error('Error:', err);
          Swal.fire('Error', 'An error occurred while deleting the ticket', 'error');
        }
      });
    } 
  });
}


selectGetUSerbyid(id: number) {
this.selectedTicketId = id;


this.TicketService.getTicketById(id).subscribe((ticket) => {
  
  this.UpdateTicket.patchValue({
    description: ticket.description,
    status: ticket.status,  
    dateCreated:this.formatDate(ticket.dateCreated)
  });
  
});
}


selectView(id: number) {
this.selectedTicketId = id;

this.TicketService.getTicketById(id).subscribe((ticket) => {
  this.ViewTicket.patchValue({
    id:ticket.id,
    description:ticket.description ,
    status:ticket.status,
    dateCreated:this.formatDate(ticket.dateCreated),
    dateChanged:this.formatDate(ticket.dateChanged)
  });
  
});
}

}


