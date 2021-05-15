import {Passenger} from '../passenger';
import {Transaction} from '../transaction';

export interface TransactionDetailDTO {
  id: number;
  passenger: Passenger;
  transaction: Transaction;

}
