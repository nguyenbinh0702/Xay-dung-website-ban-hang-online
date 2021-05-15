import { EmployeeService } from './../../shared/services/employee.service';
import { Transaction } from './../../shared/models/transaction';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

declare let Email: any;
declare let $: any;
@Component({
  selector: 'app-invoice-ticket',
  templateUrl: './invoice-ticket.component.html',
  styleUrls: ['./invoice-ticket.component.css']
})
export class InvoiceTicketComponent implements OnInit {

  transaction = {} as Transaction;
  imageSrc: String = "";
  constructor(private activatedRoute: ActivatedRoute,
              private employeeService: EmployeeService) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(data=>{
      this.employeeService.findTransactionById(Number.parseInt(data.get("id"))).subscribe(trans=>{
        this.transaction = trans;
      })
    })
  }
  changeImageBranch(id:number){
    switch(id){
      case 1:
        this.imageSrc = "../../../assets/branches-image/vietjet.png";
        break;
      case 2:
        this.imageSrc = "../../../assets/branches-image/pacific.png";
        break;
      case 3:
        this.imageSrc = "../../../assets/branches-image/bamboo.png";
        break;
      case 4:
        this.imageSrc = "../../../assets/branches-image/vnairline.gif";
        break;
    }
  }
  sendEmail(){
    Email.send({
      SecureToken : "86fe9a3e-aa53-41b1-a6fa-dab6c48f9c95",
      To : this.transaction.account.email,
      From : "hungupindn@gmail.com",
      Subject : "Vé máy bay C0320G1",
      Body : "<h3>Cảm ơn bạn đã đặt vé tại phòng vé C0320G1.</h3><div> Xin vui lòng đăng nhập website và thanh toán số tiền "+this.transaction.price+" VND cho mã chuyến bay:"
      +this.transaction.id +" Cảm ơn quý khách.</div>"
      }).then(
          $("#emailModal").modal("show")
      );
  }
}
