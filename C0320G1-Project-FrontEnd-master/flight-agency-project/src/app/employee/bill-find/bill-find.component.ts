import { BillService } from './../../shared/services/bills.service';
import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup ,FormBuilder,Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import {BillSearchFields} from '../../shared/models/billSearchField';
import { ReCaptchaV3Service } from 'ngx-captcha';
import { map, tap } from 'rxjs/operators';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { BillInvoiceComponent } from '../bill-invoice/bill-invoice.component';


declare let $: any
@Component({
  selector: 'app-bill-find',
  templateUrl: './bill-find.component.html',
  styleUrls: ['./bill-find.component.css']
})
export class BillFindComponent implements OnInit {
  captchaCode: string;
  formSearchBills: FormGroup;
  private searchFields: BillSearchFields = {} as BillSearchFields;
  currentPage: number;
  pageSize: number;
  totalElements: number;
  stt: number[] = [];
  isEmpty = false;
  message: string;
  private list;
  private billsList;
  billsListSearch;
  billId =3;
  constructor(
    private billService: BillService,
    // private reCaptchaV3Service: ReCaptchaV3Service,
    public formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<BillFindComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog
    ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }



  ngOnInit() {
    this.billsList = this.data
    this.createCaptcha()
    this.formSearchBills = this.formBuilder.group({
      confirmCaptchaCode: ['', [Validators.required]],
      billCode: [''],
      billTax:[''],
      name:['']
    },{validators: [this.checkCaptchaCode.bind(this)]})
  }

  createCaptcha() {
    document.getElementById('captcha').innerHTML = '';
    // tslint:disable-next-line:prefer-const
    let charsArray =
      '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ@';
    const lengthOtp = 5;
    const captcha = [];
    for (let i = 0; i < lengthOtp; i++) {
      const index = Math.floor(Math.random() * charsArray.length + 1); // get the next character from the array
      if (captcha.indexOf(charsArray[index]) === -1) {
        captcha.push(charsArray[index]);
      } else {
        i--;
      }
    }
    const canv = document.createElement('canvas');
    canv.id = 'captcha';
    canv.width = 100;
    canv.height = 40;
    const ctx = canv.getContext('2d');
    ctx.font = '25px Georgia';
    ctx.strokeText(captcha.join(''), 0, 30);
    // storing captcha so that can validate you can save it somewhere else according to your specific requirements
    this.captchaCode = captcha.join('');
    document.getElementById('captcha').appendChild(canv); // adds the canvas to the body element
  }

  checkCaptchaCode(formGroup: AbstractControl): ValidationErrors | null {
    // console.log(formGroup.value)
    const confirm = formGroup.value.confirmCaptchaCode;
    if (confirm !== this.captchaCode) {
      return { checkCaptchaCode: true };
    }
    return null;

  }
  get confirmCaptchaCode() {
    return this.formSearchBills.get('confirmCaptchaCode');
  }
  openDialogViewBills(): void {
    this.getBillId()
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



  searchBills() {
    this.searchFields = this.formSearchBills.value as BillSearchFields;
    console.log(this.searchFields);
    this.getPage(1);
  }

  getPage(pageNumber) {
    this.billsListSearch = this.billService.getBillsListSearch(this.searchFields, pageNumber).pipe(
      tap(res => {
        console.log("123")
        console.log(res);
        console.log("456")
        if (res != null) {
          this.totalElements = res.totalElements;
          this.pageSize = res.size;
          this.currentPage = pageNumber;
          this.billsList = res.content;
          this.stt = [];
          const firstIndex = this.pageSize * (this.currentPage - 1) + 1;
          const lastIndeex = this.pageSize * this.currentPage;
          for (let i = firstIndex; i <= lastIndeex; i++) {
            this.stt.push(i);
          }
          this.isEmpty = false;
          if (res.content.length == 0) {
            this.isEmpty = true;
          }
        }

      }),

      map(res => {
        if (res == null) {
          console.log("emty")
          this.message = "Không có kết quả"
          $(document).ready(function () {
            $("#message").prop('hidden', false),
              $("#result").prop('hidden', true)
            $("#pagination").prop('hidden', true)
          })
        } else {
          $(document).ready(function () {
            $("#result").prop('hidden', false)
            $("#message").prop('hidden', true)
            $("#pagination").prop('hidden', false)
          })
          return res.content
        }
      })
    );
    console.log(this.billsListSearch)
  }

}
