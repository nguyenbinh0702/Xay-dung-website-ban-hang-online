import { Component, OnInit, Input, ViewChildren, QueryList, ComponentRef, ComponentFactoryResolver, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { FlightSchedule } from 'src/app/shared/models/flight-schedule';
import { PriceInfo } from './../../shared/models/dto/price-info';
import { FormBuilder, FormArray } from '@angular/forms';
import { FormDirective } from '../form.directive';
import { FlightPersonalFormComponent } from '../flight-personal-form/flight-personal-form.component';
import { PassengerInfoDTO } from './../../shared/models/passenger';

@Component({
  selector: 'app-flight-oneway-booking',
  templateUrl: './flight-oneway-booking.component.html',
  styleUrls: ['./flight-oneway-booking.component.css']
})
export class FlightOnewayBookingComponent implements OnInit, AfterViewInit {

  @ViewChildren(FormDirective) entry: QueryList<FormDirective>

  @Input() depInfo: FlightSchedule;
  @Input() priceInfo: PriceInfo[];
  @Input() people: string[];
  @Output() passengers = new EventEmitter<Array<PassengerInfoDTO>>();

  private passengerInfo: Array<PassengerInfoDTO>;
  private formRef: Array<ComponentRef<FlightPersonalFormComponent>>;
  passengerInformation: FormArray;
  constructor(
    private fb: FormBuilder,
    private resolver: ComponentFactoryResolver,
  ) { }

  ngOnInit() { }

  ngAfterViewInit() {
    this.passengerInfo = new Array<PassengerInfoDTO>(this.people.length);
    this.formRef = new Array<ComponentRef<FlightPersonalFormComponent>>(this.people.length);
    this.people.forEach((val, id) => {
      this.formRef[id] = this.loadComponent(id, val);
    })

    this.formRef.forEach((val, id) => {
      val.instance.infomation.subscribe(data => {
        this.passengerInfo[id] = data;
        this.passengers.emit(this.passengerInfo);
      })
    })
  }

  loadComponent(index: number, personType: string): ComponentRef<FlightPersonalFormComponent> {
    // clear component
    this.entry.toArray()[index].viewContainer.clear();
    const resolver = this.resolver.resolveComponentFactory(FlightPersonalFormComponent);

    const componentRef = this.entry.toArray()[index].viewContainer.createComponent(resolver);
    componentRef.instance.person = personType;
    componentRef.changeDetectorRef.detectChanges();
    return componentRef;
  }
}
