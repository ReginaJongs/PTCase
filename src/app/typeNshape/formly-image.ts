import { Component } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
  selector: 'formly-field-image',
  template: `
    <div>
      <img [src]="to['src']" [alt]="to['alt']" [width]="to['width']" [height]="to['height']">
    </div>
  `,
})
export class FormlyImage extends FieldType {}