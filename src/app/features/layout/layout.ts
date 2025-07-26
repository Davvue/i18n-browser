import {Component} from '@angular/core';
import {MenuItem, PrimeIcons} from 'primeng/api';

@Component({
  selector: 'app-layout',
  standalone: false,
  templateUrl: './layout.html',
  styleUrl: './layout.scss'
})
export class Layout {
  menuItems: MenuItem[] = [
    {
      label: 'Upload', icon: PrimeIcons.UPLOAD, routerLink: ['/browser/upload'],
    },
    {
      label: 'Browser', icon: PrimeIcons.LANGUAGE, routerLink: ['/browser']
    }
  ]
}
