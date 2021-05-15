import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {EmployeeDTO} from '../../shared/models/dto/employeeDTO';
import {EmployeeService} from '../../shared/services/employee.service';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import * as xlsx from 'xlsx';
import {AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask} from '@angular/fire/storage';
import {Observable} from 'rxjs';
import {finalize} from 'rxjs/operators';
import {Router} from '@angular/router';

@Component({
  selector: 'app-employee-table',
  templateUrl: './employee-table.component.html',
  styleUrls: ['./employee-table.component.css']
})
export class EmployeeTableComponent implements OnInit {
  @ViewChild('epltable', {static: false}) epltable: ElementRef;
  today = new Date();
  // @ts-ignore
  minday: string = new Date();
  employees: EmployeeDTO[];
  employee: EmployeeDTO;
  page = 0;
  size = 5;
  message = '';
  classNameMessage = '';
  valueSearch = '';
  totalPage = 1;
  totalItems = 1;
  searchObj = {
    key: '',
    value: '',
    size: '',
    page: '',
  };
  searchEmployeeForm: FormGroup;
  addNewEmployeeForm: FormGroup;
  addNewForm = this.fb.group({
    aliases: this.fb.array(
      [this.fb.group({
        // tslint:disable-next-line:max-line-length
        fullName: ['', [Validators.required, Validators.pattern(/^([A-Z])[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]+[[\ ][A-Z][a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]+]*$/)]],
        email: ['', [Validators.required, Validators.pattern(/^[a-z][a-z0-9_\.]{5,32}@[a-z0-9]{2,}(\.[a-z0-9]{2,4}){1,2}$/)]],
        phoneNumber: ['', [Validators.required, Validators.pattern(/^(090|091|([\(][\+]84[\)]90)|([\(][\+]84[\)]91))[0-9]{7}$/)]],
        address: ['', [Validators.required]],
        birthday: ['', [Validators.required]],
        avatarImageUrl: ['', [Validators.required]],
        id: ['']
      })]
    )
  });
  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  downloadURL: Observable<string>;
  uploadProgress: Observable<number>;
  url = [];
  statusAdd = true;
  statusSave = false;

  // B-HoangLong
  private flag = -1;
  private checkEdit = false;
  private editEmployeeForm: FormGroup;
  private employeeEditId: number;

  constructor(
    private employeeService: EmployeeService,
    private afStorage: AngularFireStorage,
    private  fb: FormBuilder,
    private  formBuilder: FormBuilder,
    //B-HoangLong
    private router: Router,
  ) {
  }

  ngOnInit() {
    this.getTime();
    this.getAllEmployee(0, 5);
    this.searchEmployeeForm = this.fb.group(
      {
        key: ['', [Validators.required]],
        size: ['', [Validators.required]],
        page: ['', [Validators.required]],
        value: ['', [Validators.required]]
      }
    );
    this.addNewEmployeeForm = this.fb.group(
      {
        fullName: ['', [Validators.required, Validators.pattern(/^([A-Z])[a-z]+[[\ ][A-Z][a-z]+]*$/)]],
        email: ['', [Validators.required, Validators.pattern(/^[a-z][a-z0-9_\.]{5,32}@[a-z0-9]{2,}(\.[a-z0-9]{2,4}){1,2}$/)]],
        phoneNumber: ['', [Validators.required, Validators.pattern(/^(090|091|([\(][\+]84[\)]90)|([\(][\+]84[\)]91))[0-9]{7}$/)]],
        address: ['', [Validators.required]],
        birthday: ['', [Validators.required]],
        avatarImageUrl: ['', [Validators.required]],
        id: ['']
      }
    );
    this.editEmployeeForm = this.addNewEmployeeForm;
  }

  upload(event) {
    const id = Math.random().toString(36).substring(2);
    this.ref = this.afStorage.ref(id);
    this.task = this.ref.put(event.target.files[0]);
    this.uploadProgress = this.task.percentageChanges();
    this.downloadURL = this.ref.getDownloadURL();
    this.task.snapshotChanges().pipe(
      finalize(() => {
        this.ref.getDownloadURL().subscribe(url => {
          this.url.push(url); // <-- do what ever you want with the url..
        });
      })
    ).subscribe();
  }

  get aliases() {
    return this.addNewForm.get('aliases') as FormArray;
  }

  getTime() {
    const dd = String(this.today.getDate()).padStart(2, '0');
    const mm = String(this.today.getMonth() + 1).padStart(2, '0');
    const yyyy = this.today.getFullYear();

    // @ts-ignore
    this.today = (yyyy - 18) + '-' + mm + '-' + dd;
    console.log(this.today);
    this.minday = (yyyy - 100) + '-' + mm + '-' + dd;
    console.log(this.minday);
  }

  addAlias() {
    // tslint:disable-next-line:triple-equals
    if (this.statusAdd == false) {
      this.aliases.push(this.fb.group({
        fullName: [''],
        email: [''],
        phoneNumber: [''],
        address: [''],
        birthday: [''],
        avatarImageUrl: [''],
        id: ['']
      }));
      console.log('add row');
    }
    this.statusAdd = false;
  }

  clearAlias() {
    // tslint:disable-next-line:triple-equals
    this.aliases.removeAt(this.aliases.length - 1);
    delete this.url[this.url.length - 1];
    // tslint:disable-next-line:triple-equals
    if (this.aliases.length == 0) {
      this.statusAdd = true;
      this.getAllEmployee(0, 5);
    }
  }

  clearAlias2(index) {
    // tslint:disable-next-line:triple-equals
    this.aliases.removeAt(index);
    delete this.url[index];
    // tslint:disable-next-line:triple-equals
    if (this.aliases.length == 0) {
      this.statusAdd = true;
      this.getAllEmployee(0, 5);
    }
  }

  getAllEmployee(page, size) {
    if (page == null) {
      page = 0;
    }
    if (size == null) {
      size = 5;
    }
    console.log(this.addNewForm.controls);
    this.employeeService.getAllEmployee(page, size).subscribe(data => {
        console.log(data);
        this.totalPage = data.totalPages;
        this.totalItems = data.totalItems;
        this.page = data.currentPage;
        this.employees = data.body;
      }, error => {
        console.log('Get Data Thất Bại ');
      }, () => {
        console.log('Get Data Thành Công');
      }
    );
  }

// in ra exccel
  exportToExcel() {
    const ws: xlsx.WorkSheet =
      xlsx.utils.table_to_sheet(this.epltable.nativeElement);
    const wb: xlsx.WorkBook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(wb, ws, 'Sheet1');
    xlsx.writeFile(wb, 'epltable.xlsx');
  }

  /*
    tìm kiếm employee
  */
  searchEmployee() {
    this.searchObj = this.searchEmployeeForm.value;
    // tslint:disable-next-line:max-line-length
    this.employeeService.searchEmployees(this.searchObj.key, this.searchObj.value, this.page, this.size).subscribe(data => {
        console.log(data);
        this.employees = data.body;
        this.totalPage = data.totalPages;
        this.page = data.currentPage;
        this.totalItems = data.totalItems;
      }, error => {
        console.log('Tìm kiếm Thất Bại ');
      }, () => {
        console.log('Search thành công ,Get Data Thành Công');
      }
    );
  }

  onFirstPage() {
    this.page = 0;
    // tslint:disable-next-line:triple-equals
    if ('' == this.valueSearch) {
      this.getAllEmployee(this.page, this.size);
    } else {
      this.searchEmployee();
    }

  }

  onLastPage() {
    this.page = this.totalPage - 1;
    // tslint:disable-next-line:triple-equals
    if ('' == this.valueSearch) {
      this.getAllEmployee(this.page, this.size);
    } else {
      this.searchEmployee();
    }
  }

  onBackPage() {
    this.page--;
    // tslint:disable-next-line:triple-equals
    if ('' == this.valueSearch) {
      this.getAllEmployee(this.page, this.size);
    } else {
      this.searchEmployee();
    }

  }

  onNextPage() {
    this.page++;
    // tslint:disable-next-line:triple-equals
    if ('' == this.valueSearch) {
      this.getAllEmployee(this.page, this.size);
    } else {
      this.searchEmployee();
    }

  }

  onSubmit() {
    console.warn(this.addNewForm.value);
    this.employees = this.addNewForm.value.aliases;
    this.employees.forEach((value, index) => {
      value.avatarImageUrl = this.url[index];
    });
    this.statusSave = true;
    this.employeeService.addNewEmployees(this.employees).subscribe(data => {
      console.log(data);
    }, error => {
      console.log(error.error.message);
      this.message = error.error.message;
      this.classNameMessage = 'alert alert-danger';
      this.getAllEmployee(0, 5);
    }, () => {
      console.log('Save Thành Công');
      this.getAllEmployee(0, 5);
    });
    this.statusAdd = true;
    this.statusSave = false;
  }

  onChangeSize() {
    if (this.valueSearch != null) {
      this.searchEmployee();
    }
    // @ts-ignore
    this.getAllEmployee(this.page, this.size);
    console.log('load lại trang , size : ' + this.size);
  }

  //B-HoangLong
  checkEditEmployee(id) {
    if (!this.checkEdit) {
      this.checkEdit = !this.checkEdit;
      this.flag = id;
      this.employeeEditId = id;
      this.employeeService.getEmployeeEditById(this.employeeEditId).subscribe(data => {
        this.editEmployeeForm.patchValue(data);
        console.log(this.editEmployeeForm);
      });
    }
    if (this.flag > 0) {
      this.flag = id;
      this.employeeEditId = id;
      this.employeeService.getEmployeeEditById(this.employeeEditId).subscribe(data => {
        this.editEmployeeForm.patchValue(data);
        console.log(this.editEmployeeForm);
      });
    }
  }

  editEmployee() {
    this.employeeService.update(this.editEmployeeForm.value, this.employeeEditId).subscribe(data => {
      // this.employeeService.showNotification('', 'Sửa thành công, chúc mừng bạn');
      this.flag = -1;
      this.checkEdit = false;
      this.getAllEmployee(this.page, this.size );
    });
  }

  close() {
    this.redirectTo('employee/table');
  }

  redirectTo(uri: string) {
    this.router.navigateByUrl( '/', {skipLocationChange: true}).then(() =>
      this.router.navigate([uri]));
  }

  deleteEmployee(id: number) {
    this.employeeService.deleteEmployee(id).subscribe(data => {
      this.getAllEmployee(this.page, this.size );
      console.log(id);
    });
  }
}
