import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {EmployeeService} from '../../shared/services/employee.service';
import {Observable} from 'rxjs';
import {CustomerCheckinDto} from '../../shared/models/dto/CustomerCheckinDto';
import {CustomerSearchDto} from '../../shared/models/dto/CustomerSearchDto';
import {map, tap} from 'rxjs/operators';

// Thành Long
@Component({
  selector: 'app-employee-customer-checkin',
  templateUrl: './employee-customer-checkin.component.html',
  styleUrls: ['./employee-customer-checkin.component.css']
})
export class EmployeeCustomerCheckinComponent implements OnInit {
  private formSearchCustomerCheckin: FormGroup;
  customerCheckin: Observable<CustomerCheckinDto[]>;
  stt: number[] = [];
  currentPage: number;
  pageSize: number;
  totalElements: number;
  isEmpty = false;
  hideableDiv = false;
  private message: string;

  private searchFields: CustomerSearchDto = {} as CustomerSearchDto;

  constructor(
    public formBuilder: FormBuilder,
    private employeeService: EmployeeService
  ) { }

  ngOnInit() {
    this.formSearchCustomerCheckin = this.formBuilder.group({
      fullName: ['', [Validators.pattern('^[A-ZẮẰẲẴẶĂẤẦẨẪẬÂÁÀÃẢẠĐẾỀỂỄỆÊÉÈẺẼẸÍÌỈĨỊỐỒỔỖỘÔỚỜỞỠỢƠÓÒÕỎỌỨỪỬỮỰƯÚÙỦŨỤÝỲỶỸỴa-zắằẳẵặăấầẩẫậâáàãảạđếềểễệêéèẻẽẹíìỉĩịốồổỗộôớờởỡợơóòõỏọứừửữựưúùủũụýỳỷỹỵ\\ ]*$')]],
      address: ['', [Validators.pattern('^[A-ZẮẰẲẴẶĂẤẦẨẪẬÂÁÀÃẢẠĐẾỀỂỄỆÊÉÈẺẼẸÍÌỈĨỊỐỒỔỖỘÔỚỜỞỠỢƠÓÒÕỎỌỨỪỬỮỰƯÚÙỦŨỤÝỲỶỸỴa-zắằẳẵặăấầẩẫậâáàãảạđếềểễệêéèẻẽẹíìỉĩịốồổỗộôớờởỡợơóòõỏọứừửữựưúùủũụýỳỷỹỵ0-9\\ ]*$')]]
    });
    this.getPage(1);
  }

  getPage(pageNumber) {
    this.customerCheckin = this.employeeService.getAllPassengerCheckin(this.searchFields, pageNumber).pipe(
      tap(res => {
        console.log(res);
        if (res === null) {
          this.message = 'Không tìm thấy thông tin khách hàng khớp với tìm kiếm !';
          this.hideableDiv = false;
        } else {
          this.message = '';
        }
        this.totalElements = res.totalElements;
        this.pageSize = res.size;
        this.currentPage = pageNumber;

        this.stt = [];
        const firstIndex = this.pageSize * (this.currentPage - 1) + 1;
        const lastIndeex = this.pageSize * this.currentPage;
        for (let i = firstIndex; i <= lastIndeex; i++) {
          this.stt.push(i);
        }

        this.isEmpty = false;
        if (res.content.length ==  0) {
          this.isEmpty = true;
        }
      }, error => {
        console.log(error);
        console.log('vào được err của tap');
      }),
      map(res => res.content)
    );
  }

  search() {
    this.searchFields = this.formSearchCustomerCheckin.value as CustomerSearchDto;
    console.log(this.searchFields);
    this.getPage(1);
  }

}
