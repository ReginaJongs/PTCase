// table.type.ts
import { Component, OnInit }  from '@angular/core';
import { FieldArrayType, FormlyFieldConfig, FormlyExtension} from '@ngx-formly/core';
import { FieldConfig } from './field.config';
//import { FormlyFieldConfig } from '@ngx-formly/core';

@Component({
  selector: 'table',
  template: `
    <div>
      <table>
        <thead>
          <tr>
            <th *ngFor="let column of to['columns']">{{ column.name }}</th>
          </tr>
          <th *ngFor="let tHead of fieldConfig!.fieldArray!.fieldGroup">

        </th>
        </thead>
        <tbody>
          <tr *ngFor="let row of formControl.value; let i = index">
            <td *ngFor="let column of to['columns']">
              <!--formly-field [field]="getField(i, column.prop)"></formly-field-->
            </td>
          </tr>
        </tbody>

        <tr *ngFor="let field of fieldConfig!.fieldGroup; let i = index;">
      <!-- which means 1 more loop will give us the objects  -->
          <td *ngFor="let f of field.fieldGroup; let i2 = index;">
             
            
          </td>
        </tr>
      </table>
      <button type="button" (click)="add()">Add Row</button>
    </div>
  `,
})
export class TableTypeComponent extends FieldArrayType implements OnInit {
  fieldConfig?: FieldConfig;
  ngOnInit(): void {
    //this.fieldConfig = this.field;
  }
}
/*export class TableTypeComponent extends FieldArrayType {
  getField(field: FormlyFieldConfig, column: TableColumn, rowIndex: number ): FormlyFieldConfig {
    return field.fieldGroup[rowIndex].fieldGroup.find(f => f.key === column.prop);
  }
  getField(index: number, prop: string): FormlyFieldConfig {
    const fieldGroup = (this.field.fieldArray?.fieldGroup as FormlyFieldConfig[])[index].fieldGroup as FormlyFieldConfig[];
    return fieldGroup.find((f: FormlyFieldConfig) => f.key === prop);
  }
}*/
