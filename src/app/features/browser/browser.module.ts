import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BrowserRoutingModule } from './browser-routing.module';
import { Browser } from './pages/browser/browser';
import { Upload } from './pages/upload/upload';
import {CardModule} from 'primeng/card';
import {FileUploadModule} from 'primeng/fileupload';
import {FloatLabelModule} from 'primeng/floatlabel';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {FormsModule} from '@angular/forms';


@NgModule({
  declarations: [
    Browser,
    Upload
  ],
  imports: [
    CommonModule,
    BrowserRoutingModule,
    FormsModule,
    CardModule,
    FileUploadModule,
    FloatLabelModule,
    AutoCompleteModule
  ]
})
export class BrowserModule { }
