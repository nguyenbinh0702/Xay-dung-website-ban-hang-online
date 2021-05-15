import { Airport } from './../airport';
import { Branch } from '../branch';
export interface SelectDto{
    airports: Airport[],
    brands: Branch[]
}