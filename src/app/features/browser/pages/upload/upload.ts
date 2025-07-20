import { Component } from '@angular/core';
import {TranslationService} from '../../../../core/services/translation.service';

@Component({
  selector: 'app-upload',
  standalone: false,
  templateUrl: './upload.html',
  styleUrl: './upload.scss'
})
export class Upload {
  constructor(protected translationService: TranslationService) {}

  handleFileInput(event: Event) {
    if (!(event.target instanceof HTMLInputElement)) return;

    const file = event.target.files?.item(0);
    if (file == null) return;

    void this.translationService.loadLocale("en", file);
  }

  handleFileInput2(event: Event) {
    if (!(event.target instanceof HTMLInputElement)) return;

    const file = event.target.files?.item(0);
    if (file == null) return;

    void this.translationService.loadLocale("de", file);
  }
}
