import { Component, Input } from '@angular/core';

@Component({
  selector: 'book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.scss']
})
export class BookCardComponent {
  @Input() imgUrl: string = ''
  @Input() bookId: string = ''
}
