import { Component, OnInit } from '@angular/core';
import { SelectItems } from '@pichincha/ds-core';
import { Category } from '../../../../interfaces/category.interface';
import { CategoryService } from '../../../../services/category.service';
import { BooksService } from '../../services/books.service';
import { Book } from '../../interfaces/books.interface';

@Component({
  selector: 'app-private-library',
  templateUrl: './private-library.component.html',
  styleUrls: ['./private-library.component.scss']
})
export class PrivateLibraryComponent implements OnInit{
  public categories: SelectItems[] = [];
  public books: Book[] = [];

  constructor(
    private categoryService: CategoryService,
    private booksService: BooksService
  ) {
    this.getCategories();
  }

  ngOnInit(): void {
    const owner = 'username'
    this.getBooks(owner);
  }

  parseCategories(categories: Category[] = []){
    return categories.map((category) => {
      return {
        value: category.id,
        label: category.description,
      }
    })
  }

  getCategories() {
    this.categoryService.getAllCategories().subscribe((res) => {
      this.categories = this.parseCategories(res.response);
    });
  }

  getBooks(owner: string) {
    this.booksService.getOwnerBooks(owner).subscribe((res) => {
      this.books = res.response!
    });
  }
}
