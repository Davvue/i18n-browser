import {Component, inject, viewChild} from '@angular/core';
import {TranslationService} from '../../../../core/services/translation.service';
import {FileUpload, FileUploadHandlerEvent} from 'primeng/fileupload';
import {Locale, Locales} from '../../../../../types/locales';
import {AutoCompleteCompleteEvent} from 'primeng/autocomplete';
import {Router} from '@angular/router';

@Component({
  selector: 'app-upload',
  standalone: false,
  templateUrl: './upload.html',
  styleUrl: './upload.scss'
})
export class Upload {
  router = inject(Router);
  localeSuggestions: Locales;
  selectedLocale: Locale | null = null;
  failedUploads: Record<number, string> = {}
  uploadForm = viewChild<FileUpload>("upload");

  constructor(protected translationService: TranslationService) {
    this.localeSuggestions = translationService.loadedLocales();
  }

  searchLocales(event: AutoCompleteCompleteEvent) {
    this.localeSuggestions = this.translationService
      .loadedLocales()
      .filter(l => l.toLowerCase().includes(event.query.toLowerCase()));

    if (this.localeSuggestions.length <= 0) {
      this.localeSuggestions = [event.query];
    }

    if (this.localeSuggestions[0].toLowerCase() !== event.query.toLowerCase()) {
      this.localeSuggestions = [
        event.query,
        ...this.localeSuggestions
      ];
    }

    return this.localeSuggestions
  }

  async onUpload(event: FileUploadHandlerEvent) {
    if (!this.selectedLocale || this.selectedLocale.trim() === '') return;
    for (let i = 0; i < event.files.length; i++) {
      const file = event.files[i];
      try {
        await this.translationService.loadLocale(this.selectedLocale, file);
      } catch (error) {
        if (error instanceof Error) this.failedUploads[i] = error.message;
        else if (typeof error === 'string') this.failedUploads[i] = error;
        else this.failedUploads[i] = String(error);
      }
    }
    this.uploadForm()?.clear();

    await this.router.navigate(["/browser"]);
  }
}
