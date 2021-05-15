import { RoleGuard } from './../guards/role.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FlightCenterComponent } from './flight-center/flight-center.component';
import { FlightScheduleListComponent } from './flight-schedule-list/flight-schedule-list.component';
import { AirportResolverService } from './airport-resolver.service';
import { FlightPassengerInfoComponent } from './flight-passenger-info/flight-passenger-info.component';
import { FlightGuardGuard } from './flight-guard.guard';
import { ReservationComponent } from './reservation/reservation.component';
import { ReservationDetailComponent } from './reservation-detail/reservation-detail.component';


const routes: Routes = [{
  path: '',
  component: FlightCenterComponent,

  children: [
    {
      path: 'schedule', component: FlightScheduleListComponent, data: {
        expectedRole: 'ROLE_USER'
      },
      canActivate: [RoleGuard], resolve: { airports: AirportResolverService }
    },
    {
      path: 'confirm', component: FlightPassengerInfoComponent, data: {
        expectedRole: 'ROLE_USER'
      },
      canActivate: [RoleGuard, FlightGuardGuard]
    },
    { path: 'reservation', component: ReservationComponent },
    { path: 'reservation/:id', component: ReservationDetailComponent }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FlightRoutingModule { }
