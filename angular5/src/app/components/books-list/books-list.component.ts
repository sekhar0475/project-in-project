import { Component, OnInit } from '@angular/core';
import { GetJSONService, Books } from '../../services/getJson.service';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'app-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.css']
})
export class ListComponent implements OnInit {
	constructor(
	  private jsonService: GetJSONService
	) {}

	title = 'test value';
	books: any = [];
	authors: any = [];

	fun1($event){
		alert($event);
	}

	ngOnInit() {
		if(localStorage.getItem('authors')){
			this.authors = JSON.parse(localStorage.getItem('authors'));
		}else{
			this.jsonService.getAuthors().subscribe((data) => {
				this.authors = data;
				localStorage.setItem('authors', JSON.stringify(data));
			}, 
			(err) => {
				console.log(err);
				alert('3'); 
			});
		}

		if(localStorage.getItem('books')){
			this.books = JSON.parse(localStorage.getItem('books'));
		}else{
			this.jsonService.getBooks().subscribe((data) => {
				this.books = data;
				localStorage.setItem('books', JSON.stringify(data));
			}, 
			(err) => {
				console.log(err);
				alert('3'); 
			});
		}
	}

	deleteBook(i){
		console.log(i);
		this.books.splice(i, 1);
		localStorage.setItem('books', JSON.stringify(this.books));
	}
}
