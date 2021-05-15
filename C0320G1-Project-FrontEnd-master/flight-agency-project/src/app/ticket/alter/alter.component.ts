import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

import {Router} from '@angular/router';
import {TicketServiceService} from '../../shared/services/ticket-service.service';

@Component({
  selector: 'app-alter',
  templateUrl: './alter.component.html',
  styleUrls: ['./alter.component.css']
})
export class AlterComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<AlterComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ticketService: TicketServiceService,
    private route: Router
  ) { }

  ngOnInit() {
  }

  back() {
    this.route.navigateByUrl('tickets');
  }

}
