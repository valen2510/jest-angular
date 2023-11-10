import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { PrivateLibraryComponent } from './pages/private-library/private-library.component';
import { BookRecordComponent } from './pages/book-record/book-record.component';
import { BookViewComponent } from './pages/book-view/book-view.component';
import { PublicLibraryComponent } from './pages/public-library/public-library.component';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        component: PrivateLibraryComponent,
      },
      {
        path: 'record',
        component: BookRecordComponent,
      },
      {
        path: 'view',
        component: BookViewComponent,
      },
      {
        path: 'public',
        component: PublicLibraryComponent,
      },
      {
        path: '**',
        redirectTo: '',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BookLibraryRoutingModule {}
