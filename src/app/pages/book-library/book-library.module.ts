import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrivateLibraryComponent } from './pages/private-library/private-library.component';
import { BookRecordComponent } from './pages/book-record/book-record.component';
import { BookViewComponent } from './pages/book-view/book-view.component';
import { PublicLibraryComponent } from './pages/public-library/public-library.component';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { BookLibraryRoutingModule } from './book-library-routing.module';
import { PichinchaGridItemModule, PichinchaGridModule, PichinchaInputActionModule, PichinchaLinkButtonModule } from '@pichincha/ds-angular';
import { PrivateBooksFiltersComponent } from './components/private-books-filters/private-books-filters.component';
import { BookCardComponent } from './components/book-card/book-card.component';
import { PublicBooksFiltersComponent } from './components/public-books-filters/public-books-filters.component';
import { AppModule } from 'src/app/app.module';

@NgModule({
  declarations: [
    PrivateLibraryComponent,
    BookRecordComponent,
    BookViewComponent,
    PublicLibraryComponent,
    MainLayoutComponent,
    PrivateBooksFiltersComponent,
    BookCardComponent,
    PublicBooksFiltersComponent,
  ],
  imports: [
    AppModule,
    CommonModule,
    BookLibraryRoutingModule,
    PichinchaLinkButtonModule,
    PichinchaGridModule,
    PichinchaGridItemModule,
    PichinchaInputActionModule,
  ]
})
export class BookLibraryModule { }
