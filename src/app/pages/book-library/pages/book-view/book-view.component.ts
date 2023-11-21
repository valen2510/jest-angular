import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BooksService } from '../../services/books.service';
import { Book } from '../../interfaces/books.interface';

@Component({
  selector: 'app-book-view',
  templateUrl: './book-view.component.html',
  styleUrls: ['./book-view.component.scss']
})
export class BookViewComponent implements OnInit{
  bookInfo!: Book;

  constructor(
    private router: Router,
    private activeRouter: ActivatedRoute,
    private booksService: BooksService
  ) {

  }

  ngOnInit(): void {
    this.activeRouter.queryParamMap.subscribe((param) => {
      const id = param.get('id')
      this.booksService.getOwnerBooks('').subscribe((res) => {
        const book = res.response?.find(book => book.id === id)
        if (book) {
          this.bookInfo = book
          return
        }
        this.router.navigate(['books'])
      })
    })
  }
}
