import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: "/browser/upload", pathMatch: "full"},
  { path: 'browser', loadChildren: () => import('./features/browser/browser.module').then(m => m.BrowserModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
