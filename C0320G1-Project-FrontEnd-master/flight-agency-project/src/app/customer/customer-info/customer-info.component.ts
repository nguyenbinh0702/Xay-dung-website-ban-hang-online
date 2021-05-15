import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CustomerService} from '../../shared/services/customer.service';
import {CustomerUpdateDto} from '../../shared/models/dto/CustomerUpdateDto';
import {AngularFireStorage} from '@angular/fire/storage';
import {finalize} from 'rxjs/operators';
import {TokenStorageService} from '../../shared/services/token-storage.service';
declare var $: any;
// Created By Thiện - validate khoảng trắng
function validateWhitespace(c: AbstractControl) {
  if (c.value !== '') {
    const isWhitespace = c.value.trim().length === 0;
    if (isWhitespace) {
      const isValid = !isWhitespace;
      return isValid ? null : { whitespace: true };
    }
  }
}
// Created By Thiện - validate kí tự đặc biệt
function validateSpecialCharacters(c: AbstractControl) {
  const pattern = /[$&+,:;=?@#|'<>.^*()%!-]+/;
  return (c.value.match(pattern)) ? {
    containSpecialCharacters : true
  } : null;
}
@Component({
  selector: 'app-customer-info',
  templateUrl: './customer-info.component.html',
  styleUrls: ['./customer-info.component.css']
})
export class CustomerInfoComponent implements OnInit {
  infoForm: FormGroup;
  updateForm: FormGroup;
  customer: CustomerUpdateDto = {
    id: null,
    fullName: null,
    email: null,
    birthday: null,
    phoneNumber: null,
    gender: null,
    address: null,
    avatarImageUrl: null,
    rank: null,
    backendMessage: null
  };
  backendMessages: string[];
  message = '';
  errorMessage = '';
  selectedImage: any = null;
  imgSrc: string;
  private avatarUrl = 'https://www.w3schools.com/howto/img_avatar.png';
  constructor(private fb: FormBuilder,
              private customerService: CustomerService,
              private storage: AngularFireStorage,
              private tokenStorageService: TokenStorageService) {
  }
  ngOnInit() {
    // Created By Thiện - form thông tin khách hàng
    this.infoForm = this.fb.group({
      fullName: [''],
      email: [''],
      birthday: [''],
      phoneNumber: [''],
      gender: [''],
      address: [''],
      avatarImageUrl: [''],
      rank: ['']
    });
    this.updateForm = this.fb.group({
      fullName: ['', [Validators.required, validateSpecialCharacters, validateWhitespace,
        Validators.maxLength(30), Validators.minLength(10)]],
      birthday: ['', [Validators.required, Validators.pattern(/^([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/),
        this.customerService.validateBirthday, this.customerService.checkAge]],
      email: [''],
      phoneNumber: ['', [Validators.required, this.customerService.validPhoneNumber]],
      gender: ['', [Validators.required]],
      address: ['', [Validators.required, Validators.maxLength(60)]],
      avatarImageUrl: [''],
      rank: ['']
    });
    // Created By Thiện - Hiển thị thông tin khách hàng
    this.customer.id = this.tokenStorageService.getJwtResponse().accountId;
    this.customerService.getCustomerById(this.customer.id).subscribe(data => {
      this.avatarUrl = data.avatarImageUrl;
      this.infoForm.patchValue(data);
      this.updateForm.patchValue(data);
    }, error => {
      this.errorMessage = 'Lỗi!! Không tìm thấy tài khoản của bạn';
    });
  }
  // Created By Thiện - Chỉnh sửa thông tin khách hàng
  updateCustomer() {
    this.errorMessage = '';
    this.message = '';
    this.customer = this.updateForm.value;
    this.customer.id = this.tokenStorageService.getJwtResponse().accountId;
    if (this.selectedImage !== null) {
      const filePath = `avatar/${this.selectedImage.name.split('.').slice(0, -1).join('.')}_${new Date().getTime()}`;
      const fileRef = this.storage.ref(filePath);
      this.storage.upload(filePath, this.selectedImage).snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe(url => {
            this.customer.avatarImageUrl = url;
            console.log(this.customer.avatarImageUrl );
          });
        })
      ).subscribe();
    }
    // if (this.imgSrc !== null) {
    //   console.log(this.imgSrc);
    //   this.customer.avatarImageUrl = this.imgSrc ;
    // }
    this.customerService.updateCustomer(this.customer, this.customer.id).subscribe(data => {

      this.backendMessages = data.backendMessage;
    }, error => {
      this.errorMessage = 'Cập nhật tài khoản thất bại';
    }, () => {
      if (this.backendMessages.length === 0) {
        $('#editPopup').modal('hide');
        console.log(this.customer);
        this.message = 'Thông tin tài khoản của bạn đã được cập nhật';
      }
      this.ngOnInit();
      this.saveTodos();
    })
  }
  submit() {

  }
  showPreview(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => this.imgSrc = e.target.result;
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImage = event.target.files[0];
    } else {
      this.imgSrc = 'https://www.w3schools.com/howto/img_avatar.png';
      this.selectedImage = null;
    }
  }
  saveTodos(): void {
    // tslint:disable-next-line:only-arrow-functions
    setTimeout(function() {
      document.getElementById('message').style.display = 'none';
    }, 3000);
  }

}

