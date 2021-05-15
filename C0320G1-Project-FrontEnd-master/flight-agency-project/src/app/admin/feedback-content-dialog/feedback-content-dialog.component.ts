import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FeedbackService} from '../../shared/services/feedback.service';
import {Feedback} from '../../shared/models/feedback';
import {FormControl, FormGroup} from "@angular/forms";

declare let Email: any;
@Component({
  selector: 'app-feedback-content-dialog',
  templateUrl: './feedback-content-dialog.component.html',
  styleUrls: ['./feedback-content-dialog.component.css']
})
export class FeedbackContentDialogComponent implements OnInit {
  public content;
  public createDate;
  public customerEmail;
  public customerName;
  public customerPhone;
  public processStatus;
  public responseContent;
  public topic;
  sendMailForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<FeedbackContentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public feedbackService: FeedbackService
  ) { }

  ngOnInit() {
    this.sendMailForm = new FormGroup({
      responseContent: new FormControl(''),
    });

    this.content = this.data.data1.content;
    this.createDate = this.data.data1.createDate;
    this.customerEmail = this.data.data1.customerEmail;
    this.customerName = this.data.data1.customerName;
    this.customerPhone = this.data.data1.customerPhone;
    this.processStatus = this.data.data1.processStatus;
    this.topic = this.data.data1.topic;
    this.data.data1.responseContent = this.sendMailForm.value.responseContent;
    console.log(this.responseContent);
  }

  check() {
    this.data.data1.responseContent = this.responseContent;
  }
}
