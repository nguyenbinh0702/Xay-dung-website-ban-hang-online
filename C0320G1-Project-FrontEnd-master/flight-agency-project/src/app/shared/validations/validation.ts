import { differenceInMinutes } from 'date-fns'
import { AbstractControl, ValidationErrors, ValidatorFn, FormControl } from '@angular/forms';

// Creator: Duy
export function checkInterval(laterDate: string, earlierDate: string, minInterval: number): boolean {
    let minutes = differenceInMinutes(
        new Date(laterDate),
        new Date(earlierDate)
    )
    return minutes >= minInterval ? true : false;
}

// Creator: Duy
export function checkEmail(control: AbstractControl): ValidationErrors {
    const regex = /^([-\w.])+[a-zA-Z\d]@(\w+\.)+(\w+)$/;
    const verification = control.value;
    const isValid = regex.test(verification);
    return isValid ? null : { format: true };
}

// Creator: Duy
export const CheckPhoneNumber: ValidatorFn = (control: FormControl): ValidationErrors | null => {
    const phoneRegex = /^0[35789]\d{8}$/;
    const characterRegex = /^[^\d]+$/;
    const _phoneNumber: string = control.value;
    if (_phoneNumber === '') {
        return null;
    }
    if (characterRegex.test(_phoneNumber)) {
        return { alphabel: true };
    }
    if (!phoneRegex.test(_phoneNumber)) {
        return { format: true };
    }
    return null;
};

// Creator: Duy
export const compare: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const verification = control.value;
    const roundTrip = verification.isRoundTrip;
    const d1 = new Date(verification.depDate); // ten cua form control.
    const d2 = new Date(verification.retDate);
    if (d1.valueOf() > d2.valueOf() && roundTrip == '1') {
        return { date: true };
    }
    if (verification.babies > verification.adults) {
        return { person: true }
    }
    return null;
};
export const validation = {
  newPasswordErrors: [
    {code: 'required', message: 'Vui lòng nhập mật khẩu mới'},
    {code: 'pattern', message: 'Mật khẩu không  chứa ký tự đặc biệt'},
    {code: 'minlength', message: 'Mật khẩu phải lớn hơn 8 ký tự'},
    {code: 'maxlength', message: 'Mật khẩu phải bé hơn 16 ký tự'},
  ],
  passwords: [
    {code: 'required', message: 'Vui lòng nhập mật khẩu hiện tại'},
  ],
};
