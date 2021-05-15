import DateTimeFormat = Intl.DateTimeFormat;

export interface CustomerCheckinDto {
  id: number;
  fullName: string;
  birthDate: DateTimeFormat;
  gender: string;
  email: string;
  phoneNumber: string;
  address: string;
  confirmCaptchaCode: string;


}
