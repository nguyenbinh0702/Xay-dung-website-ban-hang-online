import { TokenStorageService } from 'src/app/shared/services/token-storage.service';
import { HomeService } from './../../shared/services/home.service';
import { FormBuilder, FormGroup, Validators, ValidatorFn, FormControl, ValidationErrors, AbstractControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Feedback } from 'src/app/shared/models/Feedback';

declare var $: any;

@Component({
  selector: 'app-send-feedback',
  templateUrl: './send-feedback.component.html',
  styleUrls: ['./send-feedback.component.css']
})
export class SendFeedbackComponent implements OnInit {

  feedBackForm: FormGroup;
  captchaCode: string;
  feedBackErrors = FEEDBACK_ERRORS;

  constructor(
    private formBuilder: FormBuilder,
    private homeService: HomeService,
    private tokenStorage: TokenStorageService
  ) {

  }


  ngOnInit() {
    this.feedBackForm = this.formBuilder.group({
      topic: ['khiếu nại', [Validators.required]],
      customerName: ['', [Validators.required, Validators.pattern(/^[ a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]+$/)]],
      customerPhone: ['', [Validators.required, validPhoneNumber]],
      customerEmail: ['', [Validators.required, Validators.pattern(/^[A-Za-z0-9]+@[A-Za-z0-9]+(\.[A-Za-z0-9]+)$/)]],
      confirmCaptchaCode: ['', [Validators.required, this.checkCaptchaCode.bind(this)]],
      content: ['', [Validators.required]]
    })
    let jwtResponse = this.tokenStorage.getJwtResponse();
    if (jwtResponse) {
      this.feedBackForm.patchValue({
        customerName: jwtResponse.name,
        customerEmail: jwtResponse.accountName
      })
    }
    this.createCaptcha();
  }

  createCaptcha() {
    document.getElementById('captcha').innerHTML = '';
    let charsArray =
      '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ@';
    const lengthOtp = 5;
    const captcha = [];
    for (let i = 0; i < lengthOtp; i++) {
      const index = Math.floor(Math.random() * charsArray.length); // get the next character from the array
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
    this.feedBackForm.patchValue({
      confirmCaptchaCode: ''
    })
  }

  checkCaptchaCode(formControl: AbstractControl): ValidationErrors | null {

    const confirmCaptchaCode = formControl.value;

    if (confirmCaptchaCode !== '' && confirmCaptchaCode !== this.captchaCode) {
      return { wrongCaptcha: true };
    }
    return null;
  }

  onSubmit() {
    this.homeService.saveFeedback(this.feedBackForm.value).subscribe(data => {
      console.log(data);
      $('#success').modal('show');
    }, error => {
      console.log(error);
      $('#violation').modal('show');
    })
  }

  reFill() {
    this.feedBackForm.patchValue({
      topic: ''
    });
    this.createCaptcha();
  }

  get topic() {
    return this.feedBackForm.get('topic');
  }

  get customerName() {
    return this.feedBackForm.get('customerName');
  }

  get customerPhone() {
    return this.feedBackForm.get('customerPhone');
  }

  get customerEmail() {
    return this.feedBackForm.get('customerEmail');
  }

  get confirmCaptchaCode() {
    return this.feedBackForm.get('confirmCaptchaCode');
  }

  get content() {
    return this.feedBackForm.get('content');
  }
}

const validPhoneNumber: ValidatorFn = (control: FormControl): ValidationErrors | null => {
  const phoneRegex = /^0[35789]\d{8}$/;
  const characterRegex = /^[^\d]+$/;
  const _phoneNumber: string = control.value;
  if (_phoneNumber === '') {
    return null;
  }
  if (characterRegex.test(_phoneNumber)) {
    return { alphabelPhoneNumber: true };
  }
  if (!phoneRegex.test(_phoneNumber)) {
    return { wrongPhoneNumber: true };
  }
  return null;
};

const FEEDBACK_ERRORS = {

  topicErrors: [
    { name: 'required', message: 'Vui lòng chọn chủ đề !' }
  ],
  customerNameErrors: [
    { name: 'required', message: 'Họ và tên không được để trống !' },
    { name: 'pattern', message: 'Họ và tên không được phép chứa số và ký tự đặc biệt !' }
  ],
  customerPhoneErrors: [
    { name: 'required', message: 'Số điện thoại không được để trống !' },
    { name: 'alphabelPhoneNumber', message: 'Số điện thoại không được phép chứa chữ cái !' },
    { name: 'wrongPhoneNumber', message: 'Số điện thoại không hợp lệ !' }
  ],
  customerEmailErrors: [
    { name: 'required', message: 'Email không được để trống !' },
    { name: 'pattern', message: 'Email không hợp lệ !' }
  ],
  confirmCaptchaCodeErrors: [
    { name: 'required', message: 'Vui lòng nhập mã xác thực !' },
    { name: 'wrongCaptcha', message: 'Mã xác thực không đúng !' }
  ],
  contentErrors: [
    { name: 'required', message: 'Vui lòng nhập nội dung !' }
  ]
}