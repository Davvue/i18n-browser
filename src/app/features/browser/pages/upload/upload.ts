import { Component } from '@angular/core';

@Component({
  selector: 'app-upload',
  standalone: false,
  templateUrl: './upload.html',
  styleUrl: './upload.scss'
})
export class Upload {
  handleFileInput(event: Event) {
    if (!(event.target instanceof HTMLInputElement)) return;

    console.log(event.target.files);
  }
}
