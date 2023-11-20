import { Component, Input } from '@angular/core';
// import { Router } from '@angular/router';

@Component({
  selector: 'book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.scss']
})
export class BookCardComponent {
  @Input() imgUrl: string = ''
  @Input() bookId: string = ''

  // constructor(private router: Router) {
  // }

  // onBookView(): void{
  //   console.log('heloooooo')
  //   this.router.navigate(['books', 'view'])
  //   console.log(('bye'))
  // }
}
