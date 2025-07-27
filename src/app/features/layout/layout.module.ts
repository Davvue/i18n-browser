import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Layout} from './layout';
import {RouterModule} from '@angular/router';



@NgModule({
  declarations: [
    Layout
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    Layout
  ]
})
export class LayoutModule { }
