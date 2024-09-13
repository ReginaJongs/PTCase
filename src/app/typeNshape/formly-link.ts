import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FieldType, FieldTypeConfig, FormlyFieldConfig }  from '@ngx-formly/core';
import { Router } from '@angular/router';
//interface moreFormly extends FormlyFieldConfig { urlKey: number; }
@Component({
  selector: 'formly-link',
  //template: `
  //<legend *ngIf="to.label">{{ to.label }}</legend>
  //<a [href]="to.url" target="_blank">{{to.desc}}</a>
  //<a [href]="https://www.google.com"}</a>
  //`,
  template: `
     <!--button [routerLink]="['/protoc', 0]">連結protoc</button> <br> -->
     <a [routerLink]="'/protoc/' + urlKey" [queryParams]="{ key: urlKey }"><br>Protocol Design</a><br>
     <br>
     <!--a href="/protoc:"+ field.key>Protocol define(醫療計畫)   typeNshap</a>-->
     <!--a (click)="navigateToProtoc(field.key)">click protocol</a>-->
     <!--a href="https://www.google.com/">go Protocol(醫療計畫Google){{to.label}}/a-->
    
  `,
}) //
export class FormlyLink extends FieldType<FieldTypeConfig> {
  //docID:number = 0;// 元件中的變數 docid
  @Input() urlKey?: number;
  constructor(private router: Router) { super();
  }
  //ngOnChanges
  ngAfterChanges(changes: SimpleChanges) {
    if (changes['urlKey']) {
      // Handle urlkey changes here
      alert('urlkey changed to: '+ this.urlKey);
    }
  }
  /*
  navigateToProtoc(appDocId:any) {//this.field.key
    if (appDocId !== undefined) {
       //const queryParams = this.to['queryParams'] || {};
       //this.router.navigate([this.to['url']], { queryParams });
       this.router.navigate(['/protoc', appDocId]);
  }}
  */

}