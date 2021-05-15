import { Transaction } from './transaction';
import { Passenger } from './passenger';
export interface TransactionDetail{
    id: number;
    passenger: Passenger;
    transaction: Transaction;
    baggage:number;
}