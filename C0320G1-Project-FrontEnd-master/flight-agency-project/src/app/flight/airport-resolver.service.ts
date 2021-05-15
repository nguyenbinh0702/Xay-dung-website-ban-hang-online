import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Airport } from '../shared/models/airport';
import { Observable } from 'rxjs';
import { AirportService } from '../shared/services/airport.service';

@Injectable({
  providedIn: 'root'
})
export class AirportResolverService implements Resolve<Airport[]> {

  constructor(
    private airportService: AirportService
  ) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Airport[] | Observable<Airport[]> | Promise<Airport[]> {
    return this.airportService.getAirports();
  }

}
