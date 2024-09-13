import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GlobalService } from './global.service';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [GlobalService],
  exports: []
})
export class SharedModule {}