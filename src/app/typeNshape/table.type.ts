import { Component, OnInit } from '@angular/core';
import { FieldArrayType, FormlyFieldConfig } from '@ngx-formly/core';

@Component({
  selector: 'formly-field-table',
  template: `
    <div>
      <table>
        <thead>
          <tr>
            <th *ngFor="let column of to['columns']">{{ column.prop }}</th>
          </tr>
        </thead>
        <tbody>
        <pre>{{ formControl.value | json }}測試</pre>
          <tr *ngFor="let row of formControl.value; let i = index">
            <td *ngFor="let column of to['columns']">
              <formly-field *ngIf="getField(i, column.prop) as field" [field]="field"></formly-field>
            </td>
          </tr>
        </tbody>
      </table>
      <button type="button" (click)="add()">Add Row</button>
    </div>
  `,
})
export class TableTypeComponent extends FieldArrayType implements OnInit {
  ngOnInit() {
    console.log('formControl:', this.formControl);
    //this.initializeForm();
  }

  initializeForm() {
    this.formControl.setValue([
      { investmentName: 'Example 1', investmentDate: '2023-01-01', stockIdentifier: '123' },
      { investmentName: 'Example 2', investmentDate: '2023-02-01', stockIdentifier: '456' },
      { investmentName: 'Example 3', investmentDate: '2023-02-01', stockIdentifier: '47' }
    ]);
  }

  getField(index: number, prop: string): FormlyFieldConfig | undefined {
    const fieldArray = this.field.fieldArray as FormlyFieldConfig;
    const fieldGroup = fieldArray.fieldGroup as FormlyFieldConfig[];

    if (fieldGroup && fieldGroup[index] && fieldGroup[index].fieldGroup) {
      return fieldGroup[index].fieldGroup!.find((f: FormlyFieldConfig) => f.key === prop);
    }
    return undefined;
  }
}
