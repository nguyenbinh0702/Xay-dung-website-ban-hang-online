import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material';
import {DeleteTicketComponent} from '../delete-ticket/delete-ticket.component';
import {AlterComponent} from '../alter/alter.component';
import {Ticket} from '../../shared/models/Ticket';
import {TicketServiceService} from '../../shared/services/ticket-service.service';

@Component({
  selector: 'app-list-ticket',
  templateUrl: './list-ticket.component.html',
  // templateUrl: './list-ticket.component.html',
  styleUrls: ['./list-ticket.component.css']
})
export class ListTicketComponent implements OnInit {

  private tickets: Ticket[];
  private  totalPages ;
  private  pageNumber = 0;
  private formSearch: FormGroup;
  private formEditTicket: FormGroup;
  private formDeleteTicket: FormGroup;
  private searchBy;
  private totalMoney;
  private flight: string;
  private idEdit;
  private idDelete;
  private name;
  private email;
  private mapTotalMoney = new Map();

  constructor(
    private ticketService: TicketServiceService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.formSearch = this.formBuilder.group({
      search: ['', [Validators.required]],
    });

    this.formEditTicket = this.formBuilder.group({
      id: ['', [Validators.required]],
      // tslint:disable-next-line:max-line-length
      name: ['', [Validators.required, Validators.pattern('(^[AẢÀÃÁẠĂẰẲẴẮẶÂẨẦẪẤẬBCDĐEÈẺẼÉẸÊỀỂỄẾỆFGHIỈÌĨÍỊJKLMNOỎÒÕÓỌÔỒỖỔỘỐƠỜỠỞỢỚPQRSTUÚỦŨỤÙƯỨỬỮỪỰVWXYỲỶỸÝỴZ][aàảãáạăằẳẵắặâầẩẫấậbcdđeèẻẽéẹêềểễếệfghiìỉĩíịjklmnoòỏõóọôồổỗốộơờởỡớợpqrstuùủũúụưừửữứựvwxyỳỷỹýỵz]*$)|(^[AẢÀÃÁẠĂẰẲẴẮẶÂẨẦẪẤẬBCDĐEÈẺẼÉẸÊỀỂỄẾỆFGHIỈÌĨÍỊJKLMNOỎÒÕÓỌÔỒỖỔỘỐƠỜỠỞỢỚPQRSTUÚỦŨỤÙƯỨỬỮỪỰVWXYỲỶỸÝỴZ][aàảãáạăằẳẵắặâầẩẫấậbcdđeèẻẽéẹêềểễếệfghiìỉĩíịjklmnoòỏõóọôồổỗốộơờởỡớợpqrstuùủũúụưừửữứựvwxyỳỷỹýỵz]*[\\ ][AẢÀÃÁẠĂẰẲẴẮẶÂẨẦẪẤẬBCDĐEÈẺẼÉẸÊỀỂỄẾỆFGHIỈÌĨÍỊJKLMNOỎÒÕÓỌÔỒỖỔỘỐƠỜỠỞỢỚPQRSTUÚỦŨỤÙƯỨỬỮỪỰVWXYỲỶỸÝỴZ][aàảãáạăằẳẵắặâầẩẫấậbcdđeèẻẽéẹêềểễếệfghiìỉĩíịjklmnoòỏõóọôồổỗốộơờởỡớợpqrstuùủũúụưừửữứựvwxyỳỷỹýỵz]*$)|(^[AẢÀÃÁẠĂẰẲẴẮẶÂẨẦẪẤẬBCDĐEÈẺẼÉẸÊỀỂỄẾỆFGHIỈÌĨÍỊJKLMNOỎÒÕÓỌÔỒỖỔỘỐƠỜỠỞỢỚPQRSTUÚỦŨỤÙƯỨỬỮỪỰVWXYỲỶỸÝỴZ][aàảãáạăằẳẵắặâầẩẫấậbcdđeèẻẽéẹêềểễếệfghiìỉĩíịjklmnoòỏõóọôồổỗốộơờởỡớợpqrstuùủũúụưừửữứựvwxyỳỷỹýỵz]*[\\ ][AẢÀÃÁẠĂẰẲẴẮẶÂẨẦẪẤẬBCDĐEÈẺẼÉẸÊỀỂỄẾỆFGHIỈÌĨÍỊJKLMNOỎÒÕÓỌÔỒỖỔỘỐƠỜỠỞỢỚPQRSTUÚỦŨỤÙƯỨỬỮỪỰVWXYỲỶỸÝỴZ][aàảãáạăằẳẵắặâầẩẫấậbcdđeèẻẽéẹêềểễếệfghiìỉĩíịjklmnoòỏõóọôồổỗốộơờởỡớợpqrstuùủũúụưừửữứựvwxyỳỷỹýỵz]*[\\ ][AẢÀÃÁẠĂẰẲẴẮẶÂẨẦẪẤẬBCDĐEÈẺẼÉẸÊỀỂỄẾỆFGHIỈÌĨÍỊJKLMNOỎÒÕÓỌÔỒỖỔỘỐƠỜỠỞỢỚPQRSTUÚỦŨỤÙƯỨỬỮỪỰVWXYỲỶỸÝỴZ][aàảãáạăằẳẵắặâầẩẫấậbcdđeèẻẽéẹêềểễếệfghiìỉĩíịjklmnoòỏõóọôồổỗốộơờởỡớợpqrstuùủũúụưừửữứựvwxyỳỷỹýỵz]*$)|(^[AẢÀÃÁẠĂẰẲẴẮẶÂẨẦẪẤẬBCDĐEÈẺẼÉẸÊỀỂỄẾỆFGHIỈÌĨÍỊJKLMNOỎÒÕÓỌÔỒỖỔỘỐƠỜỠỞỢỚPQRSTUÚỦŨỤÙƯỨỬỮỪỰVWXYỲỶỸÝỴZ][aàảãáạăằẳẵắặâầẩẫấậbcdđeèẻẽéẹêềểễếệfghiìỉĩíịjklmnoòỏõóọôồổỗốộơờởỡớợpqrstuùủũúụưừửữứựvwxyỳỷỹýỵz]*[\\ ][AẢÀÃÁẠĂẰẲẴẮẶÂẨẦẪẤẬBCDĐEÈẺẼÉẸÊỀỂỄẾỆFGHIỈÌĨÍỊJKLMNOỎÒÕÓỌÔỒỖỔỘỐƠỜỠỞỢỚPQRSTUÚỦŨỤÙƯỨỬỮỪỰVWXYỲỶỸÝỴZ][aàảãáạăằẳẵắặâầẩẫấậbcdđeèẻẽéẹêềểễếệfghiìỉĩíịjklmnoòỏõóọôồổỗốộơờởỡớợpqrstuùủũúụưừửữứựvwxyỳỷỹýỵz]*[\\ ][AẢÀÃÁẠĂẰẲẴẮẶÂẨẦẪẤẬBCDĐEÈẺẼÉẸÊỀỂỄẾỆFGHIỈÌĨÍỊJKLMNOỎÒÕÓỌÔỒỖỔỘỐƠỜỠỞỢỚPQRSTUÚỦŨỤÙƯỨỬỮỪỰVWXYỲỶỸÝỴZ][aàảãáạăằẳẵắặâầẩẫấậbcdđeèẻẽéẹêềểễếệfghiìỉĩíịjklmnoòỏõóọôồổỗốộơờởỡớợpqrstuùủũúụưừửữứựvwxyỳỷỹýỵz]*[\\ ][AẢÀÃÁẠĂẰẲẴẮẶÂẨẦẪẤẬBCDĐEÈẺẼÉẸÊỀỂỄẾỆFGHIỈÌĨÍỊJKLMNOỎÒÕÓỌÔỒỖỔỘỐƠỜỠỞỢỚPQRSTUÚỦŨỤÙƯỨỬỮỪỰVWXYỲỶỸÝỴZ][aàảãáạăằẳẵắặâầẩẫấậbcdđeèẻẽéẹêềểễếệfghiìỉĩíịjklmnoòỏõóọôồổỗốộơờởỡớợpqrstuùủũúụưừửữứựvwxyỳỷỹýỵz]*$)')]],
      departure: ['', [Validators.required]],
      destination: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern('^[\\w]+[\\@][a-z]+[\\.][a-z]+$')]],
      bookingCode: ['', [Validators.required]],
      departureTime: ['', [Validators.required]],
      price: ['', [Validators.required]],
      taxesAndFees: ['', [Validators.required]],
      airline: ['', [Validators.required]],
      arrivalTime: ['', [Validators.required]],
      typeTicket: ['', [Validators.required]],
      chair: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      address: ['', [Validators.required]],
      typeCustomer: ['', [Validators.required]],
      extraLuggage: ['', [Validators.required]],
    });

    this.formDeleteTicket = this.formBuilder.group({
      id: ['', [Validators.required]],
      name: ['', [Validators.required]],
      departure: ['', [Validators.required]],
      destination: ['', [Validators.required]],
      email: ['', [Validators.required]],
      bookingCode: ['', [Validators.required]],
      departureTime: ['', [Validators.required]],
      price: ['', [Validators.required]],
      taxesAndFees: ['', [Validators.required]],
      airline: ['', [Validators.required]],
      arrivalTime: ['', [Validators.required]],
      typeTicket: ['', [Validators.required]],
      chair: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      address: ['', [Validators.required]],
      typeCustomer: ['', [Validators.required]],
      extraLuggage: ['', [Validators.required]],
    });

    this.ticketService.page( this.formSearch.controls.search.value, this.pageNumber ).subscribe(data => {
      this.tickets = data.content;
      this.totalPages = data.totalPages;
      this.getTotalMoney();
      this.pageNumber = data.pageable.pageNumber;
    });
  }

  search() {
    this.pageNumber = 0;
    switch (this.searchBy) {
      case 'name':
        this.ticketService.page( this.formSearch.controls.search.value, this.pageNumber ).subscribe(data => {
          this.tickets = data.content;
          this.getTotalMoney();
          this.totalPages = data.totalPages;
        });
        break;

      case 'bookingCode':
        this.ticketService.page2( this.formSearch.controls.search.value, this.pageNumber ).subscribe(data => {
          this.tickets = data.content;
          this.getTotalMoney();
          this.totalPages = data.totalPages;
        });
        break;

      case 'flight':
        this.ticketService.page3( this.formSearch.controls.search.value, this.pageNumber ).subscribe(data => {
          this.tickets = data.content;
          this.getTotalMoney();
          this.totalPages = data.totalPages;
        });
        break;

      default:
        this.ticketService.page( this.formSearch.controls.search.value, this.pageNumber ).subscribe(data => {
          this.tickets = data.content;
          this.getTotalMoney();
          this.totalPages = data.totalPages;
        });
        break;
    }
  }

  next() {
      this.pageNumber = this.pageNumber + 1;
      if (this.pageNumber >= this.totalPages) {
        console.log('Khong hop le');
        this.pageNumber = this.pageNumber - 1;
      } else {
      this.page();
      }
  }

  previous() {
    this.pageNumber = this.pageNumber - 1;
    if (this.pageNumber < 0) {
      console.log('Khong hop le');
      this.pageNumber = this.pageNumber + 1;
    } else {
      this.page();
    }
  }

  first() {
    this.pageNumber = 0;
    this.page();
  }

  last() {
    this.pageNumber = this.totalPages - 1;
    this.page();
  }

  page() {
    switch (this.searchBy) {
      case 'name':
       this.ticketService.page(this.formSearch.controls.search.value, this.pageNumber).subscribe(data => {
          this.tickets = data.content;
          this.getTotalMoney();
        });
       break;

      case 'bookingCode':
        this.ticketService.page2(this.formSearch.controls.search.value, this.pageNumber).subscribe(data => {
          this.tickets = data.content;
          this.getTotalMoney();
        });
        break;

      case 'flight':
        this.ticketService.page3(this.formSearch.controls.search.value, this.pageNumber).subscribe(data => {
          this.tickets = data.content;
          this.getTotalMoney();
        });
        break;

      default:
        this.ticketService.page(this.formSearch.controls.search.value, this.pageNumber).subscribe(data => {
          this.tickets = data.content;
          this.getTotalMoney();
        });
    }
  }

  changeSearch(e) {
    // tslint:disable-next-line:no-unused-expression
    this.searchBy = e.target.value;
  }

  edit(id) {
    this.ticketService.getTicket(id).subscribe(data => {
      this.formEditTicket.patchValue(data);
      this.totalMoney = data.price + data.taxesAndFees;
      this.formatMoney();
      this.flight = data.depature + ' - ' + data.destination;
      this.idEdit = data.id;
      this.name = data.name;
      this.email = data.email;
});
  }

  submitEdit() {
    this.ticketService.updateTicket(this.idEdit, this.formEditTicket.value).subscribe((data: Ticket) => {
      // tslint:disable-next-line:triple-equals
      if (this.name == data.name && this.email == data.email ) {
        this.ngOnInit();
      } else { const dialogRef = this.dialog.open(AlterComponent, {
          width: '412px',
          height: '121px',
          data: {ticket: data},
          autoFocus: false
        });
               dialogRef.afterClosed().subscribe(result => {
          this.ngOnInit();
        });
      }
    });
  }

  delete(id) {
    this.ticketService.getTicket(id).subscribe(data => {
      this.formDeleteTicket.patchValue(data);
      this.totalMoney = data.price + data.taxesAndFees;
      this.formatMoney();
      this.flight = data.depature + ' - ' + data.destination;
      this.idDelete = data.id;
    });
  }

  submitDelete(id) {
    this.ticketService.getTicket(id).subscribe(data => {
    const dialogRef = this.dialog.open(DeleteTicketComponent, {
      width: '500px',
      height: '250px',
      data: {data1: data},
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  });
  }

  formatMoney() {
    this.totalMoney = this.totalMoney + '';
    // tslint:disable-next-line:triple-equals
    if (this.totalMoney.length == 5) {
      this.totalMoney = this.totalMoney.substring(0, 2) + '.'
        + this.totalMoney.substring(2, ) + '  VND';
    }
    // tslint:disable-next-line:triple-equals
    if (this.totalMoney.length == 6) {
      this.totalMoney = this.totalMoney.substring(0, 3) + '.'
        + this.totalMoney.substring(3, ) + '  VND';
    }
    // tslint:disable-next-line:triple-equals
    if (this.totalMoney.length == 7) {
      this.totalMoney = this.totalMoney.substring(0, 1) + '.' + this.totalMoney.substring(1, 4) + '.'
        + this.totalMoney.substring(4, ) + '  VND';
    }
    // tslint:disable-next-line:triple-equals
    if (this.totalMoney.length == 8) {
      this.totalMoney = this.totalMoney.substring(0, 2) + '.' + this.totalMoney.substring(2, 5) + '.'
        + this.totalMoney.substring(5, ) + '  VND';
    }
    // tslint:disable-next-line:triple-equals
    if (this.totalMoney.length == 9) {
      this.totalMoney = this.totalMoney.substring(0, 3) + '.' + this.totalMoney.substring(3, 6) + '.'
        + this.totalMoney.substring(6, ) + '  VND';
    }
    // tslint:disable-next-line:triple-equals
    if (this.totalMoney.length == 10) {
      this.totalMoney = this.totalMoney.substring(0, 1) + '.' + this.totalMoney.substring(1, 4) + '.'
        + this.totalMoney.substring(4, 7) + '.' + this.totalMoney.substring(7, ) + '  VND';
    }
  }

  getTotalMoney() {
    this.tickets.forEach(element => {
      this.totalMoney = element.price + element.taxesAndFees;
      this.formatMoney();
      this.mapTotalMoney.set(element.id, this.totalMoney);
    });
  }

}
