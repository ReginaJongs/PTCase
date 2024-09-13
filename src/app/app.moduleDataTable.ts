import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//top import above--------------------------------
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//import { MatIconModule, MatFormFieldModule, MatInputModule } from "@angular/material";
import { MatButtonModule} from "@angular/material/button";
import { MatIconModule} from "@angular/material/icon";
//
//import { FormsModule, ReactiveFormsModule} from '@angular/forms';
//import { FormlyNgZorroAntdModule} from '@ngx-formly/ng-zorro-antd';
import { FormGroup } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';

import { FormlyModule } from '@ngx-formly/core';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';

import { TabsModule } from 'ngx-bootstrap/tabs';
import { FormlyNgZorroAntdModule} from '@ngx-formly/ng-zorro-antd';

import { appMatModule } from './app-material.module'
import { appMatIconModule } from './app-maticon.module'
/*import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTabsModule } from '@angular/material/tabs';*/
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card'; // 引入 MatCardModule 模組
//import { MatTableDataSource } from '@angular/material/table';

import { FormlyFieldTabs } from './tabs.type';
//import { FormlyFieldTabs } from './formly/tabs.type'
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { AgGridModule } from 'ag-grid-angular';//import { AgGridModule } from 'ag-grid-angular';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ColDef } from 'ag-grid-community'; // Column Definition Type Interface
//import { FormlyFieldButton } from './app-button';
//UI介面import { AppComponent } from './app.component';

//import { DynamicFormModule } from './dynamic-form/dynamic-form.module';
import { FormlyLink } from './typeNshape/formly-link';
import { FormlyImage} from './typeNshape/formly-image';
import { FormlyWrapperNewspaper} from './typeNshape/formly-wrapper';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
//import { DatatableTypeComponent } from './typeNshape/datatable.type';

//import { GlobalService } from '../assets/global.service';  利用evironments方式進行 global.service'

//自定義路由元件(各功能頁面模組), ie. Function List於 router.moudule.ts中
import {LoginComponent} from "./login/login.component";
//**import {AppDocComponent} from "./appdocedit/appdocedit.component";
import { ProjListComponent } from "./projlist/projlist.component";
import { AppDocListComponent } from "./appdoclist/appdoclist.component";
import { FormComponent } from "./form/form.component";
//import { FormProtocolComponent } from "./formprotocol/formprotocol.component";
//import { ProtoComponent } from "./formproto/proto.component";

import { FormTestComponent } from "./formly/formlytest.component";
import { ReguProjComponent } from './reguproj/reguproj.component';
import { ReguProjDocComponent } from './reguprojdoc/reguprojdoc.component';
//個案管理
import { CaseListComponent } from './ptcaselist/caselist.component';
import { HDocListComponent } from './ptHDoclist/hdoclist.component';

import { DatatableTypeComponent } from './typeNshape/formly-table';  //0803加ˋ的

@NgModule({
  declarations: [ AppComponent, FormlyFieldTabs, //AppComponent, tabs.type.ts
    LoginComponent, ProjListComponent, AppDocListComponent, 
    FormTestComponent, FormComponent,  FormlyFieldTabs,
    ReguProjComponent, ReguProjDocComponent, CaseListComponent, HDocListComponent, 
    FormlyLink, FormlyImage, FormlyWrapperNewspaper, DatatableTypeComponent
    //DatePicker
  ],//,, FormEditComponent FormlyFieldStepper],FormEditComponent, FormlyComponent, 
  imports: [ BrowserModule, BrowserAnimationsModule, CommonModule,
    FormsModule, ReactiveFormsModule, RouterModule, AppRoutingModule, HttpClientModule, //AgGridModule,
    FormlyNgZorroAntdModule, MatTabsModule, MatCardModule, appMatModule, appMatIconModule, NgxDatatableModule,
    MatButtonModule, MatIconModule, AgGridModule, MatDatepickerModule, MatNativeDateModule, FormlyBootstrapModule,
    //MatButtonModule, MatIconModule, MatSelectModule, MatStepperModule,  MatTabsModule, 
    //FormGroup, FormlyFieldConfig, FormlyFormOptions,// FormlyBootstrapModule,MatStepperModule, MatTabsModule,MatButtonModule,
    FormlyModule.forRoot(), FormlyModule.forChild(),
    FormlyModule.forRoot({
      validationMessages: [{ name: 'required', message: 'This field is required!!!' }],
      types: [{ name: 'tabs', component: FormlyFieldTabs },
      { name: 'string', extends: 'input' },
      { name: "link", component: FormlyLink },//自行定義formly欄位可以為link
      { name: "image", component: FormlyImage },
              //{ name: 'button', component: FormlyFieldButton },
              //{ name: 'button', component: FormlyFieldButton, wrappers: ['form-field'],
              //    defaultOptions: { props: { btnType: 'default', type: 'button',} 
              //  } 
      { name: 'datatable_pre',
        //component: DatatableTypeComponent,
        defaultOptions:
        { templateOptions: 
          { columnMode: 'force', rowHeight: 'auto',
            headerHeight: '40', footerHeight: '40',
            limit: '10', scrollbarH: 'true',
            reorderable: 'reorderable',
          },
        },
      },
      { name: 'datatable',
        component: DatatableTypeComponent,
        defaultOptions: {
          templateOptions: {
            columnMode: 'force',
            rowHeight: 'auto',  headerHeight: '40', footerHeight: '40',
            limit: '10', scrollbarH: 'true', reorderable: 'reorderable',
          },
        },
      }
    ],
    wrappers: [
      { name: 'newspaper', component: FormlyWrapperNewspaper },
    ]
    }),


    TabsModule.forRoot(), // 将TabsModule模块添加到imports数组中
    FormlyNgZorroAntdModule, 
    //FormEditModule, // 将 FormEditModule 模块(subModel)导入到主模块中
    AgGridModule,// 加入 AgGridModule
    //MatNativeDateModule, MatDatepickerModule, MatInputModule, MatFormFieldModule,
   
  ],
  //imports: [BrowserModule, AppRoutingModule, RouterModule.forRoot(routes)],
  //exports: [RouterModule],
  //exports: [ MatFormFieldModule, MatInputModule, MatNativeDateModule, MatDatepickerModule,],
  bootstrap: [AppComponent, FormComponent],
  providers: []//已使用GlobalService Injectable Providedin Root
})
export class AppModule { }
