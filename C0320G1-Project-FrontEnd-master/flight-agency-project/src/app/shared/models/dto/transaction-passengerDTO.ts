import { EmployeeTransactionDTO } from './employeeTransactionDTO';
import { EmployeePassengerDTO } from './employeePassengerDTO';
//BHung
export interface TransactionPassengerDTO{
    passengers : EmployeePassengerDTO[];
    transactions: EmployeeTransactionDTO[]
}