export interface EmployeeDTO {
    id?: number;
    fullName: string;
    email: string;
    phoneNumber: string;
    address: string;
    birthday: string;
    avatarImageUrl: string;
}
export class employeeDto {
    id: number;
    fullName: string;
    birthDate: string;
    gender: string;
    email: string;
    phoneNumber: string;
    address: string;
    avatarUrl: string;
    password: string;
    newPassword: string;
    confirmPassword: string;
    backendMessage: string[];
}