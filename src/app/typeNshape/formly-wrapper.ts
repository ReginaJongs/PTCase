
import { Component } from '@angular/core';
import { FieldWrapper } from '@ngx-formly/core';

@Component({
  selector: 'formly-wrapper-newspaper',

  template: `
  <div class="newspaper-wrapper">
    <div class="newspaper-column">
      <label>{{ to.label }}</label>
      <ng-container #fieldComponent></ng-container>
    </div>
    <div class="newspaper-column">
      <label>{{ to['label2'] }}</label>
      <ng-container #fieldComponent2></ng-container>
    </div>
  </div>
`,
styles: [
    `
      .newspaper-wrapper {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
      }

      .newspaper-column {
        width: calc(50% - 10px);
        margin-bottom: 20px;
      }
    `,
  ]
})
export class FormlyWrapperNewspaper extends FieldWrapper {}

/*  template: `
    <div class="newspaper-wrapper">
      <label>{{ to.label }}</label>
      <ng-container #fieldComponent></ng-container>
    </div>
  `, */