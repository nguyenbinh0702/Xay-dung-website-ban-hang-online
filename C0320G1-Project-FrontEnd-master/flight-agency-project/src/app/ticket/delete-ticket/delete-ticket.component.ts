import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Router} from '@angular/router';
import {TicketServiceService} from '../../shared/services/ticket-service.service';

@Component({
  selector: 'app-delete-ticket',
  templateUrl: './delete-ticket.component.html',
  styleUrls: ['./delete-ticket.component.css']
})
export class DeleteTicketComponent implements OnInit {
  name;
  bookingCode;
  airline;
  id;
  constructor(
    public dialogRef: MatDialogRef<DeleteTicketComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ticketService: TicketServiceService,
    private route: Router
  ) { }

  ngOnInit() {
    this.name = this.data.data1.name;
    this.id = this.data.data1.id;
    this.bookingCode = this.data.data1.bookingCode;
    this.airline = this.data.data1.airline;
  }

  delete() {
    this.ticketService.deleteTicket(this.id).subscribe(data => {
      this.route.navigateByUrl('tickets');
    });
  }

}
