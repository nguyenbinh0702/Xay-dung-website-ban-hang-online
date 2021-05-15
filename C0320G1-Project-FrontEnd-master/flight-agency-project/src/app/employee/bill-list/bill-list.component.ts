import { BillInvoiceComponent } from './../bill-invoice/bill-invoice.component';
import { Page } from './../../shared/models/page';
import { Bill } from '../../shared/models/bill';
import { Observable } from 'rxjs';
import { BillFindComponent } from './../bill-find/bill-find.component';
import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {BillService} from "../../shared/services/bills.service"
import { FormGroup ,FormBuilder,Validators, AbstractControl, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-bill-list',
  templateUrl: './bill-list.component.html',
  styleUrls: ['./bill-list.component.css']
})
export class BillListComponent implements OnInit {

  billsList: Bill[];
  billId = 3;
  formBillInvoice: FormGroup;


  constructor(public dialog: MatDialog,
              private billsService: BillService,
              public formBuilder: FormBuilder,
    ) { }
  
  openDialogFind(): void {
    const dialogRef = this.dialog.open(BillFindComponent, {
      width: '900px',
      data: {billList: this.billsList}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  openDialogViewBills(id): void {
    // this.getBillId()
    this.billId = id
    const dialogRef = this.dialog.open(BillInvoiceComponent, {
      width: '800px',
      data: {billList: this.billsList, billId : this.billId}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  getBillId(): number{
    console.log("Test vs bill 3")
    // this.bi
    return 3;
  }

  loadBillsList(){
    this.billsService.getBillsList().subscribe(data => {this.billsList = data.content, console.log(this.billsList)})
  }

  ngOnInit() {
    this.loadBillsList();
  }

}
