// Message for Promo searching and creation form
import { AbstractControl, FormControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const PROMO_INVALID_INPUT_WARNING = {
  namePromoErrors: [
    { code: 'required', message: 'Không được để trống' },
    { code: 'maxlength', message: 'Vui lòng nhập không quá 30 kí tự' },
    { code: 'pattern', message: 'Chỉ bao gồm chữ cái và chữ số' }
  ],
  discountErrors: [
    { code: 'required', message: 'Không được để trống' },
    { code: 'min', message: 'Vui lòng nhập giá trị trong khoảng 0-100' },
    { code: 'max', message: 'Vui lòng nhập giá trị trong khoảng 0-100' },
    { code: 'pattern', message: 'Chỉ bao gồm một số dương' }
  ],
  airlineErrors: [
    { code: 'required', message: 'Không được để trống' }
  ],
  departurePlaceErrors: [
    { code: 'required', message: 'Không được để trống' }
  ],
  arrivalPlaceErrors: [
    { code: 'required', message: 'Không được để trống' }
  ],
  promoDateStartErrors: [
    { code: 'required', message: 'Không được để trống' },
    { code: 'date', message: 'Ngày bắt đầu khuyến mãi phải trước ngày bắt đầu chuyến bay' }
  ],
  promoDateEndErrors: [
    { code: 'required', message: 'Không được để trống' },
    { code: 'date', message: 'Ngày kết thúc phải sau ngày bắt đầu' }
  ],
  flightDepartureDateStartErrors: [
    { code: 'required', message: 'Không được để trống' }
  ],
  flightDepartureDateEndErrors: [
    { code: 'required', message: 'Không được để trống' },
    { code: 'date', message: 'Ngày kết thúc phải sau ngày bắt đầu' }
  ],
};

export const validCompareDate: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const verification = control.value;
  const flightStart = new Date(verification.flightDepartureDateStart); // ten cua form control.
  const flightEnd = new Date(verification.flightDepartureDateEnd);
  const promoStart = new Date(verification.promoDateStart); // ten cua form control.
  const promoEnd = new Date(verification.promoDateEnd);
  if (flightStart.valueOf() > flightEnd.valueOf() && promoStart.valueOf() > promoEnd.valueOf()) {
    return { flightDateNotValid: true, promoDateNotValid: true };
  } else if (promoStart.valueOf() > promoEnd.valueOf()) {
    return { promoDateNotValid: true };
  } else if (flightStart.valueOf() > flightEnd.valueOf()) {
    return { flightDateNotValid: true };
  }
  if (promoEnd.valueOf() > flightEnd.valueOf()) {
    return { promoEndLaterThanFlightEnd: true };
  }
  return null;
};

export const validChooseDateOfPast: ValidatorFn = (control: FormControl): ValidationErrors | null => {
  let date = new Date();
  let today = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  // console.log(today);
  const flightStart = new Date(control.value);
  const flightEnd = new Date(control.value);
  const promoStart = new Date(control.value);
  const promoEnd = new Date(control.value);
  if (flightStart.valueOf() < today.valueOf() || flightEnd.valueOf() < today.valueOf()
    || promoStart.valueOf() < today.valueOf() || promoEnd.valueOf() < today.valueOf()) {
    return { chooseDateOfPast: true };
  }
  return null;
};

export const validPlace: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const departurePlace = control.value.departurePlace;
  const arrivalPlace = control.value.arrivalPlace;
  if (departurePlace !== '' && arrivalPlace !== '' && departurePlace === arrivalPlace) {
    console.log('duplicated');
    return { duplicatedPlace: true };
  }
  return null;
};
