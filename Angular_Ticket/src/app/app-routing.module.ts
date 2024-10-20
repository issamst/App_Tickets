import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';






import { TicketComponent } from './componets/ticket/ticket.component';


const routes: Routes = [
  { path: '', component: TicketComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
