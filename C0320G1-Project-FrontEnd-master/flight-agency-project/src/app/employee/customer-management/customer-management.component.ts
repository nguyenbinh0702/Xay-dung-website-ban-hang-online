import {Component, OnInit} from '@angular/core';
import {listCustomerDto} from '../../shared/models/dto/listCustomerDto';
import {CustomerServiceService} from '../../shared/services/customer-service.service';
import {map, tap} from 'rxjs/operators';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
declare var $: any;

@Component({
  selector: 'app-customer-management',
  templateUrl: './customer-management.component.html',
  styleUrls: ['./customer-management.component.css']
})
export class CustomerManagementComponent implements OnInit {
  currentPage: number;
  pageSize: number;
  totalElements: number;
  customerList: Observable<listCustomerDto[]>;
  stt: number[];
  isEmpty = false;
  formSearch: FormGroup;
   message = '';



  constructor(public customerService: CustomerServiceService,
              public fb: FormBuilder) {
  }

  ngOnInit() {
    this.formSearch = this.fb.group({
      key: ['name', Validators.required],
      value: ['', Validators.required]
    });
    // this.getPage(1);
    this.getPage(1);

  }

  search() {
    this.getPage(1);
  }

  getPage(page: number) {
    this.customerList = this.customerService.getPage_2(page , this.formSearch.value.key, this.formSearch.value.value).pipe(
      tap(res => {
        this.totalElements = res.totalElements;
        this.pageSize = res.size;
        this.currentPage = page;

        this.stt = [];
        const firstIndex = this.pageSize * (this.currentPage - 1) + 1;
        const lastIndeex = this.pageSize * this.currentPage;
        for (let i = firstIndex; i <= lastIndeex; i++) {
          this.stt.push(i);
        }
        if (this.totalElements <1) {
          this.message = 'Không tìm thấy thông tin khách hàng khớp với tìm kiếm !';
          $("table").hide();
        }else {
          $("table").show();
          this.message = '';
        }

        this.isEmpty = false;
        if (res.content.length === 0) {
          this.isEmpty = true;
        }
      }, error => {
        console.log(error);
      }),
      map(res => res.content),
    );
  }


}
