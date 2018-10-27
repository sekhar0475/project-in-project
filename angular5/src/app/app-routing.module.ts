import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { DetailsComponent } from './components/details/book-details.component';
import { ListComponent } from './components/books-list/books-list.component';
import { EditComponent } from './components/edit-book/edit-book.component';
import { AddBookComponent } from './components/add-book/add-book.component';

const routes: Routes = [
  { path: '', component: ListComponent },
  { path: 'books-list', component: ListComponent },
  { path: 'add-book', component: AddBookComponent },
  { path: 'book/:id', component: DetailsComponent },
  { path: 'edit-book/:id', component: EditComponent }
  // { path: 'ro/:id', component: RoRedirectComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
