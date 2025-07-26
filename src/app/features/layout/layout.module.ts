import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Layout} from './layout';
import {RouterModule} from '@angular/router';
import {CardModule} from "primeng/card";



@NgModule({
  declarations: [
    Layout
  ],
  imports: [
    CommonModule,
    RouterModule,
    CardModule
  ],
  exports: [
    Layout
  ]
})
export class LayoutModule { }
