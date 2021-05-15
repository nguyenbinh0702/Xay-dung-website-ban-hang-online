export interface CustomerChangePassDto {
  'id': number;
  'password': string;
  'newPassword': string;
  'confirmPassword': string;
  'backendMessage': string[];
}
