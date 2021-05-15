export interface Employee {
  [prop: string]: any;

  id: number;
  fullName: string;
  birthDate: string;
  gender: string;
  email: string;
  phoneNumber: string;
  address: string;
  idCard: string;
  role: bigint;
  passwords: string;
  status: boolean;
  avatarUrl: string;
}
