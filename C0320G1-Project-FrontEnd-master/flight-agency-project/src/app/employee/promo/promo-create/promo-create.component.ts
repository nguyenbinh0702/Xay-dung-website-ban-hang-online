import { Component, OnInit } from '@angular/core';
import { Branch } from '../../../shared/models/branch';
import { Airport } from '../../../shared/models/airport';
import { PromoService } from '../../../shared/services/promo.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  PROMO_INVALID_INPUT_WARNING,
  validChooseDateOfPast,
  validCompareDate, validPlace
} from '../../../shared/validations/promo-validator';
import { Router } from '@angular/router';

@Component({
  selector: 'app-promo-create',
  templateUrl: './promo-create.component.html',
  styleUrls: ['./promo-create.component.css']
})
export class PromoCreateComponent implements OnInit {

  private newPromo: any;
  private airlineList: Branch[];
  private airportList: Airport[];
  private createForm: FormGroup;
  private message: any;
  private errors = PROMO_INVALID_INPUT_WARNING;

  constructor(
    public promoService: PromoService,
    public router: Router
  ) { }

  ngOnInit() {
    this.promoService.getAirlines().subscribe(data => {
      this.airlineList = data;
    });
    this.promoService.getAirports().subscribe(data => {
      this.airportList = data;
    });
    this.createForm = new FormGroup({
      namePromo: new FormControl('', [Validators.required, Validators.maxLength(60), Validators.pattern('[ 0-9A-ZẮẰẲẴẶĂẤẦẨẪẬÂÁÀÃẢẠĐẾỀỂỄỆÊÉÈẺẼẸÍÌỈĨỊỐỒỔỖỘÔỚỜỞỠỢƠÓÒÕỎỌỨỪỬỮỰƯÚÙỦŨỤÝỲỶỸỴa-zắằẳẵặăấầẩẫậâáàãảạđếềểễệêéèẻẽẹíìỉĩịốồổỗộôớờởỡợơóòõỏọứừửữựưúùủũụýỳỷỹỵ]{1,}')]),
      place: new FormGroup(
        {
          departurePlace: new FormControl('', Validators.required),
          arrivalPlace: new FormControl('', Validators.required)}, validPlace),
      airline: new FormControl('', Validators.required),
      discount: new FormControl('', [Validators.required, Validators.min(0), Validators.max(100), Validators.pattern('[0-9]{1,}')]),
      flightGroup: new FormGroup(
        {
          flightDepartureDateStart: new FormControl('', validChooseDateOfPast),
          flightDepartureDateEnd: new FormControl('', validChooseDateOfPast),
          promoDateStart: new FormControl('', validChooseDateOfPast),
          promoDateEnd: new FormControl('', validChooseDateOfPast)
        }, validCompareDate),
    });
  }

  createNewPromo(): void {
    if (this.createForm.valid) {
      this.newPromo = {
        namePromo: this.createForm.value.namePromo,
        discount: this.createForm.value.discount / 100,
        airline: this.airlineList.find(x => x.id == this.createForm.value.airline),
        departurePlace: this.airportList.find(x => x.id == this.createForm.value.place.departurePlace),
        arrivalPlace: this.airportList.find(x => x.id == this.createForm.value.place.arrivalPlace),
        promoDateStart: this.promoService.convertDate(this.createForm.value.flightGroup.promoDateStart),
        promoDateEnd: this.promoService.convertDate(this.createForm.value.flightGroup.promoDateEnd),
        flightDepartureDateStart: this.promoService.convertDate(this.createForm.value.flightGroup.flightDepartureDateStart),
        flightDepartureDateEnd: this.promoService.convertDate(this.createForm.value.flightGroup.flightDepartureDateEnd),
        delete: false
      };
      console.table(this.newPromo);
      this.promoService.createPromo(this.newPromo).subscribe(
        data => {
          console.log(data);
          console.log('tạo mới thành công');
          this.router.navigateByUrl('/employee/promotion');
        }
      );
    } else {
      this.message = 'Vui lòng điền đầy đủ thông tin hợp lệ';
    }
  }

  //to valid
  get namePromo() {
    return this.createForm.get('namePromo');
  }
  get discount() {
    return this.createForm.get('discount');
  }
  get airline() {
    return this.createForm.get('airline');
  }
  get place() {
    return this.createForm.get('place') as FormGroup;
  }
  get departurePlace() {
    return this.createForm.get('place.departurePlace');
  }
  get arrivalPlace() {
    return this.createForm.get('place.arrivalPlace');
  }
  get flightGroup() {
    return this.createForm.get('flightGroup') as FormGroup;
  }
  get promoDateStart() {
    return this.createForm.get('flightGroup.promoDateStart');
  }
  get promoDateEnd() {
    return this.createForm.get('flightGroup.promoDateEnd');
  }
  get flightDepartureDateStart() {
    return this.createForm.get('flightGroup.flightDepartureDateStart');
  }
  get flightDepartureDateEnd() {
    return this.createForm.get('flightGroup.flightDepartureDateEnd');
  }

}
