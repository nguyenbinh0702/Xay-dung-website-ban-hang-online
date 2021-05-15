// material.module.ts

import { NgModule } from '@angular/core';
import { MatDatepickerModule, MatFormFieldModule, MatInputModule, MatStepperModule, MatButtonModule } from '@angular/material';
import { MatNativeDateModule } from "@angular/material/core";
import { MatDialogModule } from "@angular/material/dialog";
import { CommonModule } from '@angular/common';


@NgModule({
  imports: [
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatInputModule,
    MatDialogModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatInputModule,
    CommonModule,
    MatButtonModule,
    MatDatepickerModule,
    MatDialogModule
  ],
  exports: [
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatInputModule,
    MatDialogModule,
    MatStepperModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatInputModule,
    CommonModule,
    MatButtonModule,
    MatDatepickerModule,
    MatDialogModule
  ]
})

export class MaterialModule { }
