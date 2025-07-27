import {Component} from '@angular/core';
import {TranslationService} from '../../../../core/services/translation.service';
import {FileUploadHandlerEvent} from 'primeng/fileupload';
import {Locale, Locales} from '../../../../../types/locales';
import {AutoCompleteCompleteEvent} from 'primeng/autocomplete';

@Component({
  selector: 'app-upload',
  standalone: false,
  templateUrl: './upload.html',
  styleUrl: './upload.scss'
})
export class Upload {
  localeSuggestions: Locales;
  selectedLocale: Locale | null = null;

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

    return this.localeSuggestions
  }

  async onUpload(event: FileUploadHandlerEvent) {
    if (!this.selectedLocale || this.selectedLocale.trim() === '') return;
    for (const file of event.files) {
      await this.translationService.loadLocale(this.selectedLocale, file);
    }
  }
}
