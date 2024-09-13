import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
//top import above--------------------------------
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//import { FormsModule, ReactiveFormsModule} from '@angular/forms';
//import { FormlyNgZorroAntdModule} from '@ngx-formly/ng-zorro-antd';
import { FormGroup } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';

import { FormlyModule } from '@ngx-formly/core';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';

import { TabsModule } from 'ngx-bootstrap/tabs';
import { FormlyNgZorroAntdModule} from '@ngx-formly/ng-zorro-antd';

import { appMatModule } from './app-material.module'
/*import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTabsModule } from '@angular/material/tabs';*/
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card'; // 引入 MatCardModule 模組
import { MatTableDataSource } from '@angular/material/table';

import { FormlyFieldTabs } from './tabs.type';
//import { FormlyFieldTabs } from './formly/tabs.type'
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AgGridModule } from 'ag-grid-angular';
//import { FormlyFieldButton } from './app-button';

//import { DynamicFormModule } from './dynamic-form/dynamic-form.module';
import { FormlyLink } from './typeNshape/formly-link';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
//import { DatatableTypeComponent } from './typeNshape/datatable.type';

//自定義路由元件(各功能頁面模組), ie. Function List於 router.moudule.ts中
import {LoginComponent} from "./login/login.component";
//**import {AppDocComponent} from "./appdocedit/appdocedit.component";
import { ProjListComponent } from "./projlist/projlist.component";
import { AppDocListComponent } from "./appdoclist/appdoclist.component";
import { FormComponent } from "./form/form.component";
import { FormProtocolComponent } from "./formprotocol/formprotocol.component";
import { ProtoComponent } from "./formproto/proto.component";
//import { ProtocComponent } from "./formproto/protoc.component";
import { FormTestComponent } from "./formly/formlytest.component";
import { ReguProjComponent } from './reguproj/reguproj.component';
import { ReguProjDocComponent } from './reguprojdoc/reguprojdoc.component';
//import { FormlyFieldButton } from './app-button';
//import { DataService } from "./form/data.service";

@NgModule({
  declarations: [AppComponent,  FormlyFieldTabs, //tabs.type.ts
    LoginComponent, ProjListComponent, AppDocListComponent, 
    FormTestComponent, FormComponent, FormProtocolComponent, ProtoComponent,  FormlyFieldTabs,
    ReguProjComponent, ReguProjDocComponent, FormlyLink, //DatatableTypeComponent
    
  ],//,, FormEditComponent FormlyFieldStepper],FormEditComponent, FormlyComponent, 
  imports: [ BrowserModule, BrowserAnimationsModule, CommonModule,
    FormsModule, ReactiveFormsModule, AppRoutingModule, HttpClientModule, AgGridModule,
    MatTabsModule, MatCardModule, FormlyBootstrapModule, appMatModule, NgxDatatableModule,
    //MatButtonModule, MatIconModule, MatSelectModule, MatStepperModule,  MatTabsModule, 
    //FormGroup, FormlyFieldConfig, FormlyFormOptions,// FormlyBootstrapModule,MatStepperModule, MatTabsModule,MatButtonModule,
    FormlyModule.forRoot(), 
    FormlyModule.forRoot({
      validationMessages: [{ name: 'required', message: 'This field is required' }],
      types: [{ name: 'tabs', component: FormlyFieldTabs },
      { name: 'string', extends: 'input' },
      { name: "link", component: FormlyLink },
              //{ name: 'button', component: FormlyFieldButton },
              //{ name: 'button', component: FormlyFieldButton, wrappers: ['form-field'],
              //    defaultOptions: { props: { btnType: 'default', type: 'button',} 
              //  } 
      { name: 'datatable',
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
    ],
    }),


    TabsModule.forRoot(), // 将TabsModule模块添加到imports数组中
    FormlyNgZorroAntdModule, 
    //FormEditModule, // 将 FormEditModule 模块(subModel)导入到主模块中
  ],
  //imports: [BrowserModule, AppRoutingModule, RouterModule.forRoot(routes)],
  //exports: [RouterModule],
  bootstrap: [AppComponent, FormComponent, ProtoComponent],

  providers: []
})
export class AppModule { }
