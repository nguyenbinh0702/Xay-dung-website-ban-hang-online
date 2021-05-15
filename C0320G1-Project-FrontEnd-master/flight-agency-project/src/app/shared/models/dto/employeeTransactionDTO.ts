import { Account } from '../account';
import { FlightSchedule } from '../flight-schedule';
//BHung
export interface EmployeeTransactionDTO{
    id:number;
    flightSchedule: FlightSchedule;
    account: Account;
    price: number;
    createdTime: string;
    dueTime: string;
    status:string;
}