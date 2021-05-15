import { Transaction } from './transaction';

export interface Bill {
    [prop: string]: any;
    id: number;
    dateCreated: string;
    billCode: string;
    taxCode: string;
    transaction: Transaction;

}