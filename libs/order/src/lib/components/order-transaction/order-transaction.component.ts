import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  Renderer2,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'order-transaction',
  templateUrl: './order-transaction.component.html',
})
export class OrderTransactionComponent implements AfterViewInit {
  @ViewChild('mySelector') selectorRef = {} as ElementRef<HTMLElement>;
  @Input() status: number = 0;

  constructor(private render: Renderer2) { }

  ngAfterViewInit(): void {
    this.render.setStyle(
      this.selectorRef.nativeElement.querySelector('.progress-bar'),
      'height',
      this.statusProgress
    );
  }

  get statusProgress(): string {
    switch (+this.status) {
      case 0:
        return '0';
      case 1:
        return 'calc(25% + 16px)';
      case 2:
        return 'calc(50% + 16px)';
      case 3:
        return '100%';
      default:
        return '0';
    }
  }
}
