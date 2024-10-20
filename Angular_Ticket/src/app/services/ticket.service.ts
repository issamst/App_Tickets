import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  private baseUrl: string = "https://localhost:7181/api/Ticket_Controllers";

  constructor(private http: HttpClient) { }

  // Get all tickets
  getAllTickets(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  // Get a ticket by ID
  getTicketById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }

  // Create a new ticket
  createTicket(ticket: any): Observable<any> {
    return this.http.post<any>(this.baseUrl, ticket);
  }

  // Update an existing ticket
  updateTicket(id: number, ticket: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${id}`, ticket);
  }

  // Delete a ticket
  deleteTicket(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${id}`);
  }
  GetTicket_delete(): Observable<any> {
    return this.http.get<any>(this.baseUrl + '/Ticket_Deleted');
}
Ticket_Delete_Final(id:any): Observable<any> {
  return this.http.delete<any>(this.baseUrl + '/Ticket_Delete_Final/'+id);
}
back_Ticket(id: any): Observable<any> {
  return this.http.post<any>(this.baseUrl + '/back_Ticket/' + id, {});
}
}
