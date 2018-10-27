import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { GetJSONService } from './services/getJson.service';
import { AppComponent } from './app.component';
import { DetailsComponent } from './components/details/book-details.component';
import { ListComponent } from './components/books-list/books-list.component';
import { EditComponent } from './components/edit-book/edit-book.component';
import { AddBookComponent } from './components/add-book/add-book.component';
import { HttpModule } from '@angular/http';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';

@NgModule({
  declarations: [
    AppComponent, 
    DetailsComponent, 
    ListComponent, 
    EditComponent,
    AddBookComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    HttpClientJsonpModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    MaterialModule,
    BrowserAnimationsModule,
    // StoreModule.provideStore({ 
    //   //place for future reducers
    // }),
    // StoreDevtoolsModule.instrumentOnlyWithExtension()
  ],
  providers: [GetJSONService],
  bootstrap: [AppComponent]
})
export class AppModule { }
