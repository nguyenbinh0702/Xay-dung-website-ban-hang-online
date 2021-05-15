import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {CustomerCheckinDto} from '../../shared/models/dto/CustomerCheckinDto';
import {NOTIFICATION_USER} from '../../shared/validations/passengerCheckin';
import {Observable, Subscription} from 'rxjs';
import {TransactionDetailDTO} from '../../shared/models/dto/TransactionDetailDTO';
import {TransactionDetailSearchDto} from '../../shared/models/dto/TransactionDetailSearchDto';
import {CustomerService} from '../../shared/services/customer.service';
import {map} from 'rxjs/operators';
import {Router} from '@angular/router';


// Thành Long
@Component({
  selector: 'app-customer-checkin',
  templateUrl: './customer-checkin.component.html',
  styleUrls: ['./customer-checkin.component.css']
})
export class CustomerCheckinComponent implements OnInit {
  private formSearchCustomer: FormGroup;
  stt: number[] = [];
  transactionDetails: Observable<TransactionDetailDTO[]>;
  private idPassengers: number[] = [];
  code: string;
  hideableDiv = false;
  errors = NOTIFICATION_USER;
  private interval: any;
  private message: string;
  private subscription: Subscription = new Subscription();

  private searchFields: TransactionDetailSearchDto = {} as TransactionDetailSearchDto;

  constructor(
    public formBuilder: FormBuilder,
    private customerService: CustomerService,
    private router: Router
  ) { }

  ngOnInit() {
    this.createCaptcha();
    this.formSearchCustomer = this.formBuilder.group({
      id: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9]{1,}$')]],
      // fullName: ['', [Validators.required, Validators.pattern('^[A-ZẮẰẲẴẶĂẤẦẨẪẬÂÁÀÃẢẠĐẾỀỂỄỆÊÉÈẺẼẸÍÌỈĨỊỐỒỔỖỘÔỚỜỞỠỢƠÓÒÕỎỌỨỪỬỮỰƯÚÙỦŨỤÝỲỶỸỴa-zắằẳẵặăấầẩẫậâáàãảạđếềểễệêéèẻẽẹíìỉĩịốồổỗộôớờởỡợơóòõỏọứừửữựưúùủũụýỳỷỹỵ\\ ]*$')]],
      confirmCaptchaCode: ['', [Validators.required]]
    }, {validators: [ this.checkCaptchaCode.bind(this)]});
  }

  createCaptcha() {
    document.getElementById('captcha').innerHTML = '';
    const charsArray =
      '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ@';
    const lengthOtp = 5;
    const captcha = [];
    for (let i = 0; i < lengthOtp; i++) {
      const index = Math.floor(Math.random() * charsArray.length + 1);
      if (captcha.indexOf(charsArray[index]) === -1) {
        captcha.push(charsArray[index]);
      } else {
        i--;
      }
    }
    const canv = document.createElement('canvas');
    canv.id = 'captcha';
    canv.width = 100;
    canv.height = 30;
    const ctx = canv.getContext('2d');
    ctx.font = '25px Georgia';
    ctx.strokeText(captcha.join(''), 0, 20);
    this.code = captcha.join('');
    document.getElementById('captcha').appendChild(canv);
  }

  checkCaptchaCode(formGroup: AbstractControl): ValidationErrors | null {
    const cap: CustomerCheckinDto = formGroup.value;
    const confirm = cap.confirmCaptchaCode;
    console.log(confirm);
    console.log(this.code);
    if (confirm !== this.code) {
      return {checkCaptchaCode: true};
    }
    return null;
  }

  get confirmCaptchaCode() {
    return this.formSearchCustomer.get('confirmCaptchaCode');
  }

  togglePass() {
    if (this.hideableDiv === true) {
      this.hideableDiv = false;
    } else {
      this.hideableDiv = true;
    }
  }

  getTransactionDetail() {
    this.transactionDetails = this.customerService.searchTransactionDetail(this.formSearchCustomer.get('id').value).pipe(
      map((data: TransactionDetailDTO[]) => {
        if (data === null) {
          this.message = 'Không tìm thấy chuyến bay khớp với tìm kiếm !';
          this.hideableDiv = false;
        }
        if (this.hideableDiv === true) {
          this.message = '';
        }
        data.forEach(val => {
          this.idPassengers.push(val.passenger.id);
        });
        return data;
      })
    );
  }


  checkin() {
    console.log(this.idPassengers);
    this.customerService.checkinPassenger(this.idPassengers)
      .subscribe(data => {
        this.interval = setInterval(() => {
          this.stopReload();
        }, 100);
      });
    window.location.reload();
    alert('Checkin thành công !');
  }

  stopReload() {
    this.subscription.unsubscribe();
    clearInterval(this.interval);
  }


  search() {
    this.togglePass();
    this.searchFields = this.formSearchCustomer.value as TransactionDetailSearchDto;
    console.log(this.searchFields);
    this.getTransactionDetail();
    this.stt = [];
    for (let i = 1; i < 1000; i++) {
      this.stt.push(i);
    }
  }

  home() {
    this.router.navigate(['']);
  }

  back() {
    window.location.reload();
  }

}
