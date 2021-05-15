import { Airport } from '../airport';

//BHung
export interface EmployeeFlightSearchDTO {
    departurePlace: Airport;
    departureDate: string;
    arrivalDate: string;
    arrivalPlace?: Airport;
    adult: number;
    child: number;
    baby: number;
}