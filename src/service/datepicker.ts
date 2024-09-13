import { Component } from '@angular/core';
import { ICellEditorAngularComp } from 'ag-grid-angular';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

@Component({
  selector: 'app-date-picker',
  template: `
    <mat-form-field>
      <input matInput [matDatepicker]="picker" [(ngModel)]="dateValue" (dateChange)="onDateChange($event)">
      <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
      <mat-datepicker #picker></mat-datepicker>
    </mat-form-field>
  `,
})
export class DatePickerComponent implements ICellEditorAngularComp {
  private params: any;
  public dateValue: Date;
  
  constructor() {
    this.dateValue = new Date();
  }

  agInit(params: any): void {
    this.params = params;
    this.dateValue = this.params.value;
  }

  getValue(): any {
    return this.dateValue.toISOString();
  }

  onDateChange(event: MatDatepickerInputEvent<Date>) {
    this.dateValue = event.value!;
  }
}
