import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BrowserRoutingModule } from './browser-routing.module';
import { Browser } from './pages/browser/browser';


@NgModule({
  declarations: [
    Browser
  ],
  imports: [
    CommonModule,
    BrowserRoutingModule
  ]
})
export class BrowserModule { }
