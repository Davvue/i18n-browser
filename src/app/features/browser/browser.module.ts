import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BrowserRoutingModule } from './browser-routing.module';
import { Browser } from './pages/browser/browser';
import { Upload } from './pages/upload/upload';


@NgModule({
  declarations: [
    Browser,
    Upload
  ],
  imports: [
    CommonModule,
    BrowserRoutingModule
  ]
})
export class BrowserModule { }
