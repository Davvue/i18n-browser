import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Browser } from './pages/browser/browser';
import {Upload} from './pages/upload/upload';

const routes: Routes = [{ path: '', component: Browser }, {path: "upload", component: Upload}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BrowserRoutingModule { }
