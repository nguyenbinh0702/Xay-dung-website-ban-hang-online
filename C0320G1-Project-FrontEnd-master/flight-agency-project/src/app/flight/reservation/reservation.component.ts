import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PaymentService } from 'src/app/shared/services/payment.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {

  private findReservationForm: FormGroup;
  private notFound: boolean;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private paymentService: PaymentService
  ) { }

  ngOnInit() {
    this.findReservationForm = this.fb.group({
      reservationCode: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.pattern('[0-9]{10}')]]
    });
  }

  get findReservationFG() {
    return this.findReservationForm;
  }

  get reservationCode() {
    return this.findReservationForm.get('reservationCode');
  }

  get phone() {
    return this.findReservationForm.get('phone');
  }

  get isNotFound() {
    return this.notFound;
  }

  findReservation() {
    this.paymentService.findReservation(this.reservationCode.value, this.phone.value)
      .subscribe(data => {
        if (data != null) {
          this.router.navigateByUrl(`flight/reservation/${data.id}`);
        } else {
          this.notFound = true;
        }
      });
  }

}
