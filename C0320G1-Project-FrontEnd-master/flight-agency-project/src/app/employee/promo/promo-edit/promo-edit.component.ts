import { Promo } from './../../../shared/models/promo';
import { PromoService } from './../../../shared/services/promo.service';
import { PromoUpdateDto } from './../../../shared/models/dto/PromoUpdateDto';
import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { AbstractControl, FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { from, Observable } from 'rxjs';
import { Branch } from 'src/app/shared/models/branch';
import { Airport } from 'src/app/shared/models/airport';
import { map } from 'rxjs/operators'



function validateWhitespace(c: AbstractControl) {
  if (c.value != '') {
    const isWhitespace = c.value.length === 0;
    if (isWhitespace) {
      const isValid = !isWhitespace;
      return isValid ? null : { 'whitespace': true };
    }
  }
}
// function validateSpecialCharacters(c: AbstractControl) {
//   const pattern = /[$&+,:;=?@#|'<>.^*()%!-]+/;
//   return (c.value.match(pattern)) ? {
//     containSpecialCharacters: true
//   } : null
// }

@Component({
  selector: 'app-promo-edit',
  templateUrl: './promo-edit.component.html',
  styleUrls: ['./promo-edit.component.css']
})
export class PromoEditComponent implements OnInit, AfterViewInit {

  private newPromo: any;
  public airlineList: Branch[];
  public airportList: Airport[];
  // public promoId;
  message = "";
  errorMessage = "";
  @ViewChild('focusCheck', { static: true }) private elementRef: ElementRef;
  promoForm: FormGroup;
  hideableDiv = false;
  promo: Promo[];
  id: number;

  constructor(private fb: FormBuilder,
    private promoService: PromoService,
    private router: Router,
    public activeRoute: ActivatedRoute) { }


  ngAfterViewInit(): void {
    this.elementRef.nativeElement.focus();
  }

  ngOnInit() {
    this.promoForm = this.fb.group({
      namePromo: ['', [Validators.required, validateWhitespace, Validators.maxLength(255)]],
      discount: ['', [Validators.required, Validators.max(1), Validators.min(0)]],
      airline: ['', [Validators.required, validateWhitespace]],
      departurePlace: ['', [Validators.required, validateWhitespace]],
      arrivalPlace: ['', [Validators.required, validateWhitespace]],
      flightDepartureDateStart: ['', [Validators.required, Validators.pattern(/^([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/)]],
      flightDepartureDateEnd: ['', [Validators.required, Validators.pattern(/^([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/)]],
      promoDateStart: ['', [Validators.required, Validators.pattern(/^([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/)]],
      promoDateEnd: ['', [Validators.required, Validators.pattern(/^([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/)]]
    });

    this.activeRoute.params.subscribe(data => {
      this.id = data.id;
      this.promoService.getPromoById(this.id).subscribe(data => {
        this.promoForm.patchValue(data);
      })
    });


    this.promoService.getAirlines()
      // .pipe(map(value => JSON.parse(value)))
      .subscribe(data => {
        this.airlineList = data;
      });


    this.promoService.getAirports()
      // .pipe(map(value => JSON.parse(value)))
      .subscribe(data => {
        this.airportList = data;
      });
    console.log(this.promoForm);
  }
  updatePromo() {  
    
    if ( this.promoForm.valid) {
      this.newPromo = {
        namePromo: this.promoForm.value.namePromo,
        discount: this.promoForm.value.discount / 100,
        airline: this.airlineList.find(x => x.id == this.promoForm.value.airline),
        departurePlace: this.airportList.find(x => x.id == this.promoForm.value.departurePlace),
        arrivalPlace: this.airportList.find(x => x.id == this.promoForm.value.arrivalPlace),
        promoDateStart: this.promoForm.value.promoDateStart,
        promoDateEnd: this.promoForm.value.promoDateEnd,
        flightDepartureDateStart: this.promoForm.value.flightDepartureDateStart,
        flightDepartureDateEnd: this.promoForm.value.flightDepartureDateEnd,
      };
      console.log(this.newPromo);
      this.promoService.updatePromo(this.id, this.newPromo).subscribe(data => { }
        , error => { this.errorMessage = "Cập nhật thất bại" }, () => {
          if (this.errorMessage.length == 0) {
            this.message = "Cập nhật thành công";
          }
        })
    }
    
  }

  backToPromoList() {
    this.router.navigateByUrl("/employee/promotion");
  }
}
