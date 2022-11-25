import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'eshop-admin-page-header',
  templateUrl: './page-header.component.html',
})
export class PageHeaderComponent {
  @Input() title: string = '';
  @Input() subtitle: string = '';
  @Input() btnLink: string = '';
  @Input() canReload: boolean = false;
  @Output() onRefresh = new EventEmitter();

  refresh() {
    this.onRefresh.emit();
  }
}
