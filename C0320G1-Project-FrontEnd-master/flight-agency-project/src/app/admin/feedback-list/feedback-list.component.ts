import { Component, OnInit } from '@angular/core';
import {Feedback} from '../../shared/models/feedback';
import {Observable} from 'rxjs';
import {FeedbackService} from '../../shared/services/feedback.service';
import {Page} from '../../shared/models/dto/page';
import {map, tap} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {FeedbackSearch} from '../../shared/models/feedbackSearch';
import {FeedbackContentDialogComponent} from '../feedback-content-dialog/feedback-content-dialog.component';
// @ts-ignore
import {MatDialog} from '@angular/material/dialog';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

declare let Email: any;
@Component({
  selector: 'app-feedback-list',
  templateUrl: './feedback-list.component.html',
  styleUrls: ['./feedback-list.component.css']
})
export class FeedbackListComponent implements OnInit {
  private formSearchList: FormGroup;
  feedback: Feedback = null;
  feedbackPage: Observable<Feedback[]>;
  feedbackList: Feedback[];
  lastPage: number;
  currentPage: number;
  pageSize = 4;
  totalElements: number;
  isEmpty = false;
  stt: number[];
  unprocessedStatusAmount = 0;
  private message: string;
  private searchFields: FeedbackSearch = {} as FeedbackSearch;


  constructor(private feedbackService: FeedbackService,
              private httpClient: HttpClient,
              public dialog: MatDialog,
              public formBuilder: FormBuilder) { }

  ngOnInit() {
    this.formSearchList = this.formBuilder.group({
      // tslint:disable-next-line:max-line-length
      customerName: ['', [Validators.pattern('^[A-ZẮẰẲẴẶĂẤẦẨẪẬÂÁÀÃẢẠĐẾỀỂỄỆÊÉÈẺẼẸÍÌỈĨỊỐỒỔỖỘÔỚỜỞỠỢƠÓÒÕỎỌỨỪỬỮỰƯÚÙỦŨỤÝỲỶỸỴa-zắằẳẵặăấầẩẫậâáàãảạđếềểễệêéèẻẽẹíìỉĩịốồổỗộôớờởỡợơóòõỏọứừửữựưúùủũụýỳỷỹỵ0-9\\ ]*$')]],
      createDate: [''],
      processStatus: [''],
    });
    this.getFeedbackPage(1);
    this.getAllFeedback();
  }

  search() {
    this.searchFields = this.formSearchList.value as FeedbackSearch;
    console.log(this.searchFields.createDate);
    this.getFeedbackPage(1);
  }

  getFeedbackPage(pageNumber) {
    this.feedbackPage = this.feedbackService.getFeedbackPage(this.searchFields, pageNumber).pipe(
      tap(res => {
        console.log(res);
        this.totalElements = res.totalElements;
        this.pageSize = res.size;
        this.currentPage = pageNumber;

        this.stt = [];
        const firstIndex = this.pageSize * (this.currentPage - 1) + 1;
        const lastIndex = this.pageSize * this.currentPage;
        for (let i = firstIndex; i <= lastIndex; i++) {
          this.stt.push(i);
        }

        this.isEmpty = false;
        if (res.content.length === 0) {
          this.isEmpty = true;
        }
      }, error => {
        console.log(error);
        console.log('vào được err của tap');
      }),
      map(res => res.content)
    );
  }

  getAllFeedback(): void {
    this.feedbackService.getFeedbackList().subscribe(data => {
      this.feedbackList = data;
      for (let i = 0; i < this.feedbackList.length; i++) {
        if (this.feedbackList[i].processStatus === false) {
          this.unprocessedStatusAmount++;
        }
      }
    });
  }

  openFeedbackDialog(feedback): void {
    this.feedback = feedback;
    const dialogRef = this.dialog.open(FeedbackContentDialogComponent, {
      width: '700px',
      data: {data1: this.feedback},
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(this.feedback);
      this.sendMail();
      this.feedbackService.editFeedback(this.feedback, this.feedback.id).subscribe();
      this.ngOnInit();
    });
  }

  sendMail() {
    Email.send({
      Host: 'smtp.elasticemail.com',
      Username: 'tunguyen.engineer@gmail.com',
      Password: 'B579A3EB900372A42177F604902042E70B4F',
      To: this.feedback.customerEmail,
      From: 'tunguyen.engineer@gmail.com',
      Subject: 'test mail',
      Body: this.feedback.responseContent,
    }).then((message) => {
      console.log(this.feedback.responseContent);
      console.log(this.feedback.customerEmail);
    });
  }

  setColorFieldStatusOfProcessStatus(status) {
    if (status === false) {
      return 'text-danger';
    } else if (status === true) {
      return 'text-muted';
    }
  }
}


