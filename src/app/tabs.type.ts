import { Component } from '@angular/core';
import { FieldType, FormlyFieldConfig } from '@ngx-formly/core';

@Component({
  selector: 'formly-field-tabs',
  styleUrls: ['./tabs.type.scss'],
  //<mat-tab-group headerPosition="below" style="color: rgb(255, 0, 0); background-color: rgb(0, 255, 0);">
   //<mat-icon>inbox</mat-icon>
   template: `
    <mat-tab-group mat-stretch-tabs ="false" style ="backgroundColor:rgb(218.222.219);color:rgb(218.222.219)" >
    <mat-tab style = "backgroundColor:rgb(218.222.219)"
        *ngFor="let tab of field.fieldGroup; let i = index; let last = last"
        [label]="tab.props?.label!" as string >
        <formly-field [field]="tab"></formly-field>
        <button *ngIf="last" class="btn btn-primary" [disabled]="!form.valid" type="submit">Submit</button>
      </mat-tab>
    </mat-tab-group>
  `,
})
export class FormlyFieldTabs extends FieldType {
  isValid(field: FormlyFieldConfig): boolean {
    if (field.key) {
      return field.formControl!.valid;
    }

    return field.fieldGroup ? field.fieldGroup.every((f) => this.isValid(f)) : true;
  }
}