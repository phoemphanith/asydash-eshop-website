import { Component, Input } from '@angular/core';

@Component({
  selector: 'eshop-admin-page-header',
  templateUrl: './page-header.component.html',
})
export class PageHeaderComponent {
  @Input() title: string = '';
  @Input() subtitle: string = '';
  @Input() btnLink: string = '';
}
