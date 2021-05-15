import { Promo } from './../../../shared/models/promo';
import { Component, OnInit } from '@angular/core';
import { PromoService } from '../../../shared/services/promo.service';
import { Airport } from '../../../shared/models/airport';
import { Branch } from '../../../shared/models/branch';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  PROMO_INVALID_INPUT_WARNING,
  validCompareDate, validPlace,
} from '../../../shared/validations/promo-validator';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-promo-list',
  templateUrl: './promo-list.component.html',
  styleUrls: ['./promo-list.component.css']
})
export class PromoListComponent implements OnInit {


  message = "";
  errorMessage = "";
  deletedPromo : Promo;
  promo: Promo[];
  private promoList: any;
  private airlineList: Branch[];
  private airportList: Airport[];
  private createForm: FormGroup;

  private page: number = 1;
  private statusPromo: string = 'active';

  private infoSearch: any;
  private errors = PROMO_INVALID_INPUT_WARNING;

  constructor(
    public promoService: PromoService
  ) { }

  ngOnInit() {
    this.promoService.getPromo(this.statusPromo, 1).subscribe(data => {
      this.promoList = data;
    });
    this.promoService.getAirlines().subscribe(data => {
      this.airlineList = data;
    });
    this.promoService.getAirports().subscribe(data => {
      this.airportList = data;
    });
    this.createForm = new FormGroup({
      namePromo: new FormControl('', [Validators.maxLength(60), Validators.pattern('[ 0-9A-ZẮẰẲẴẶĂẤẦẨẪẬÂÁÀÃẢẠĐẾỀỂỄỆÊÉÈẺẼẸÍÌỈĨỊỐỒỔỖỘÔỚỜỞỠỢƠÓÒÕỎỌỨỪỬỮỰƯÚÙỦŨỤÝỲỶỸỴa-zắằẳẵặăấầẩẫậâáàãảạđếềểễệêéèẻẽẹíìỉĩịốồổỗộôớờởỡợơóòõỏọứừửữựưúùủũụýỳỷỹỵ]{1,}')]),
      place: new FormGroup(
        {
          departurePlace: new FormControl(''),
          arrivalPlace: new FormControl('')
        }, validPlace),
      airline: new FormControl(''),
      discount: new FormControl('', [Validators.min(0), Validators.max(100), Validators.pattern('[0-9]{1,}')]),
      flightGroup: new FormGroup(
        {
          flightDepartureDateStart: new FormControl(''),
          flightDepartureDateEnd: new FormControl(''),
          promoDateStart: new FormControl(''),
          promoDateEnd: new FormControl('')
        }, validCompareDate),
    });
    this.page = 1;
  }

  showPromoList(status: string) {
    this.promoService.getPromo(status, 1).subscribe(data => {
      this.promoList = data;
    });
    this.statusPromo = status;
  }

  searchPromo() {
    console.log(this.createForm);
    if (this.createForm.valid) {
      this.infoSearch = {
        namePromo: this.createForm.value.namePromo,
        airline: this.createForm.value.airline,
        departurePlace: this.createForm.value.place.departurePlace,
        arrivalPlace: this.createForm.value.place.arrivalPlace,
        promoDateStart: this.createForm.value.flightGroup.promoDateStart,
        promoDateEnd: this.createForm.value.flightGroup.promoDateEnd,
        flightDepartureDateStart: this.createForm.value.flightGroup.flightDepartureDateStart,
        flightDepartureDateEnd: this.createForm.value.flightGroup.flightDepartureDateEnd
      };
      console.table(this.infoSearch);
      this.page = 1;
      this.statusPromo = 'search';
      this.promoService.searchPromo(this.infoSearch, this.page)
        .pipe(map(value => JSON.parse(value)))
        .subscribe(data => {
          this.promoList = data;
          console.log(data);
        }
        );
      document.getElementById('nav-tab').style.display = 'none';
    }
  }
  deletePromo(id: number) {
    this.promoService.deletePromo(id).subscribe(
      (data) => { 
        this.promo = this.promo.filter((s) => {
          return s.id !== this.deletedPromo.id;
        });
        
      }     
      // , error => { this.errorMessage = "Xóa thất bại" }, () => {
      //   if (this.errorMessage.length == 0) {
      //     this.message = "Xóa thành công";
      //   }
      // }
    );
  }
  selectDeletedPromo(service: Promo) {
    this.deletedPromo = service;
    console.table(service);
  }
  reloadPage(){
    this.ngOnInit();
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

  //pagination
  goToPage(position) {
    (position === 'previous') ? this.page -= 1 : this.page += 1;

    if (this.statusPromo !== 'search') {
      this.promoService.getPromo(this.statusPromo, this.page).subscribe(data => {
        this.promoList = data;
      });
    } else {
      this.promoService.searchPromo(this.infoSearch, this.page).pipe(map(value => JSON.parse(value)))
        .subscribe(data => {
          this.promoList = data;
          console.log(data);
        }
        );
    }
  }

}
