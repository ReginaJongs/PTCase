import { FormlyFieldConfig } from '@ngx-formly/core';
export interface FieldConfig extends FormlyFieldConfig {
  buttonText?: string;
  field?:string;
  headerText?: string;
  width?: string;
  fieldArray?: FieldConfig | undefined;
  fieldGroup?: FieldConfig[] | undefined
}
