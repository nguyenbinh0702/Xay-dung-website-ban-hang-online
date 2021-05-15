import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {FlightSchedule} from '../../shared/models/flight-schedule';
import {PromoSearchDto} from '../../shared/models/dto/promoSearchDto';
import {FormBuilder, FormGroup} from '@angular/forms';
import {map} from 'rxjs/operators';
import {PromoService} from '../../shared/services/promo.service';
import {FlightSearchDTO} from '../../shared/models/dto/flight-search-dto';
import {Airport} from '../../shared/models/airport';


@Component({
  selector: 'app-promotion',
  templateUrl: './promotion.component.html',
  styleUrls: ['./promotion.component.css']
})
export class PromotionComponent implements OnInit {


  constructor(
    public promoService: PromoService,
    private formBuilder: FormBuilder,
  ) {
    console.log(this.branch);
    this.loadScripts();
    this.getToday();
  }

  promoList: Observable<FlightSchedule[]>;
  promoList1: Observable<FlightSchedule[]>;
  private searchFields: PromoSearchDto;
  private departure: string;
  private today: Date;
  private dd: string;
  private mm: string;
  private yyyy: string;
  private getday = '2020-10-02';
  // tslint:disable-next-line:max-line-length
  private branch: string[] = ['', '../../../assets/branches-image/vietjet.png', '../../../assets/branches-image/pacific.png', '../../../assets/branches-image/bamboo.png', '../../../assets/branches-image/vnairline.gif'];
  // tslint:disable-next-line:max-line-length
  private listAirport: string[] = ['', 'Hà Nội' , 'Hải Phòng' , 'Điện Biên' , 'Thanh Hóa' , 'Quảng Ninh' , 'Vinh' , 'Huế' , 'Đồng Hới' , 'Đà Nẵng' , 'Pleiku' , 'Tuy Hòa' , 'Hồ Chí Minh' , 'Nha Trang' , 'Đà Lạt' , 'Phú Quốc' , 'Tam Kỳ' , 'Qui Nhơn' , 'Cần Thơ' , 'Côn Đảo' , 'Ban Mê Thuột' , 'Rạch Giá' , 'Cà Mau'];
  private i: number;
  private countday: string;
  private airport: Observable<Airport[]>;
  private searchFormPromo: FormGroup;
  private select = 1 ;
  private dep: string ;
  private arr: string;
  private count = 0;
  private block = 'block';

  ngOnInit() {
    this.getPromo1(this.getday);
    this.getairport();
    this.searchFormPromo = this.formBuilder.group({
      departureAirport: [''],
      arrivalAirport: [''],
      departureDateTime: [''],
      arrivalDateTime: [''],
      babies: [''],
      children: [''],
      adults: ['']
    });
  }

  // loading script

  loadScripts() {
    const dynamicScripts = [
      '../../../assets/javascript/promotion.js'
    ];
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < dynamicScripts.length; i++) {
      const node = document.createElement('script');
      node.src = dynamicScripts[i];
      node.type = 'text/javascript';
      node.async = false;
      node.charset = 'utf-8';
      document.getElementsByTagName('head')[0].appendChild(node);
    }
  }

  getairport() {
    this.airport = this.promoService.getAllairport().pipe(
      map((data: Airport[]) => {
        console.log(data);
        return data;
      })
    );
  }

  getPromo1(today1: string) {
    this.promoList = this.promoService.getAllFlightPromo(today1).pipe(
      map((data: FlightSchedule[]) => {
        console.log(data);
        if (data.length === 0) {
          document.getElementById('nodata').style.display = 'block';
          alert('Ngày ' + this.getday + ' Không có chuyến bay khuyến mãi !!!');
        } else {
          document.getElementById('nodata').style.display = 'none';
          console.log(data);
          return data;
        }
      })
    );
  }

  getToday() {
    this.today = new Date();
    this.dd = this.today.getDate().toString();
    this.mm = String(this.today.getMonth() + 1);
    if (parseFloat(this.mm) < 10) {
      this.mm = '0' + this.mm;
    }
    if (parseFloat(this.dd) < 10) {
      this.dd = '0' + this.dd;
    }
    this.yyyy = this.today.getFullYear().toString();
    this.getday = this.yyyy + '-' + this.mm + '-' + this.dd;
  }

  dayOfWeek(day: number) {
    this.today = new Date();
    this.mm = String(this.today.getMonth() + 1);
    if (parseFloat(this.mm) < 10) {
      this.mm = '0' + this.mm;
    }
    this.yyyy = this.today.getFullYear().toString();
    for (this.i = 0; this.i < day; this.i++) {
      this.dd = String(this.today.getDate() + this.i);
      if (parseFloat(this.dd) < 10) {
        this.dd = '0' + this.dd;
      }
      this.countday = this.yyyy + '-' + this.mm + '-' + this.dd;
    }
    this.getday = this.countday;
    this.ngOnInit();
  }

  promoSearch() {
    if (this.select === 1) {
      document.getElementById('nodata').style.display = 'none';
      console.log(this.searchFormPromo.value);
      const search: FlightSearchDTO = {
        sortBy: '',
        departure: this.searchFormPromo.get('departureAirport').value,
        arrival: this.searchFormPromo.get('arrivalAirport').value,
        depDate: this.searchFormPromo.get('departureDateTime').value,
        babies: this.searchFormPromo.get('babies').value,
        children: this.searchFormPromo.get('children').value,
        adults: this.searchFormPromo.get('adults').value
      };
      console.log(search);
      this.promoList = this.promoService.searchFlightPromo(search).pipe(
        map((data: FlightSchedule[]) => {
          // @ts-ignore
          if (data.length === 0) {
            alert('Ngày ' + this.searchFormPromo.get('departureDateTime').value + 'Không có chuyến bay khuyến mãi !!!');
            document.getElementById('nodata').style.display = 'block';
          }
          console.log(data);
          return data;
        })
      );
      const search1: FlightSearchDTO = {
        sortBy: '',
        departure: this.searchFormPromo.get('arrivalAirport').value,
        arrival: this.searchFormPromo.get('departureAirport').value,
        depDate: this.searchFormPromo.get('arrivalDateTime').value,
        babies: this.searchFormPromo.get('babies').value,
        children: this.searchFormPromo.get('children').value,
        adults: this.searchFormPromo.get('adults').value
      };
      this.promoList1 = this.promoService.searchFlightPromo(search1).pipe(
        map((data: FlightSchedule[]) => {
          // @ts-ignore
          if (data.length === 0) {
            alert('Ngày ' + this.searchFormPromo.get('arrivalAirport').value + 'Không có chuyến bay khuyến mãi !!!');
            document.getElementById('dayWeek').style.display = 'none';
            document.getElementById('dayWeek1').style.display = 'block';
            document.getElementById('nodata1').style.display = 'block';
          } else {
            document.getElementById('nodata1').style.display = 'none';
            document.getElementById('dayWeek').style.display = 'none';
            document.getElementById('dayWeek1').style.display = 'block';
            console.log(data);
            return data;
          }
          this.arr = this.airport[this.searchFormPromo.get('arrivalAirport').value] ;
          this.dep = this.airport[this.searchFormPromo.get('departureAirport').value] ;
        })
      );
    } else {
      document.getElementById('nodata').style.display = 'none';
      document.getElementById('dayWeek').style.display = 'none';
      document.getElementById('dayWeek1').style.display = 'none';
      const search: FlightSearchDTO = {
        sortBy: '',
        departure: this.searchFormPromo.get('departureAirport').value,
        arrival: this.searchFormPromo.get('arrivalAirport').value,
        depDate: this.searchFormPromo.get('departureDateTime').value,
        babies: this.searchFormPromo.get('babies').value,
        children: this.searchFormPromo.get('children').value,
        adults: this.searchFormPromo.get('adults').value
      };
      console.log(search);
      this.promoList = this.promoService.searchFlightPromo(search).pipe(
        map((data: FlightSchedule[]) => {
          // @ts-ignore
          if (data.length === 0) {
            alert('Ngày ' + this.searchFormPromo.get('departureDateTime').value + 'Không có chuyến bay khuyến mãi !!!');
            document.getElementById('nodata').style.display = 'block';
          }
          console.log(data);
          return data;
        })
      );
    }
  }

  roundTrip() {
    this.select = 1;
    console.log(this.select);
  }


  oneWay() {
    this.select = 0;
  }

  selected(i: number) {
    this.block = 'none';
    document.getElementById('selected' + i).style.display = 'block';
  }
}
