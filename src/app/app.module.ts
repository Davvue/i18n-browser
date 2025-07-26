import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import {CoreModule} from './core/core.module';
import { App } from './app';
import {provideAnimations} from '@angular/platform-browser/animations';
import {providePrimeNG} from 'primeng/config';
import {provideHttpClient} from '@angular/common/http';
import {CustomPreset} from '../lib/themeConfig';
import {LayoutModule} from './features/layout/layout.module';

@NgModule({
  declarations: [
    App,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    LayoutModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideAnimations(),
    provideHttpClient(),
    providePrimeNG({
      theme: {
        preset: CustomPreset,
        options: {
          darkModeSelector: ".p-dark"
        }
      }
    })
  ],
  bootstrap: [App]
})
export class AppModule { }
