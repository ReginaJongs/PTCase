import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTabsModule } from '@angular/material/tabs';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//import { FormlyFieldTabs } from './formly/tabs.type'
//匯集專案中會使用到的 material 套件，並export，待 app.module.ts匯入
@NgModule({ 
    //declarations:[ FormlyFieldTabs],
    imports: 
    [ BrowserAnimationsModule, MatButtonModule, MatIconModule,
      MatSelectModule, MatStepperModule, MatTabsModule 
    ],
    exports: 
    [ BrowserAnimationsModule, MatButtonModule, MatIconModule,
      MatSelectModule, MatStepperModule, MatTabsModule
    ]
  })
  export class appMatModule {}