import { Component, OnInit } from '@angular/core';
import { GetJSONService, Books } from '../../services/getJson.service';
import { Observable } from 'rxjs/Rx';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class DetailsComponent implements OnInit {
	constructor(
	  private jsonService: GetJSONService,
	  private route: ActivatedRoute,
	) {}

	books: any = [];
	id: any;
	currentBook: any;

	ngOnInit() {
		this.route.params.forEach((params: Params) => {
			if (params['id'] !== undefined) {
				this.id = params['id'];
				this.getData();
			}else{
				console.log(params['id']);
			}
		});
	}

	getData(){
		if(localStorage.getItem('books')){
			this.books = JSON.parse(localStorage.getItem('books'));
			this.getBookById(this.id);
		}else{
			this.jsonService.getBooks().subscribe((data) => {
				this.books = data;
				localStorage.setItem('books', JSON.stringify(data));
				this.getBookById(this.id);
			}, 
			(err) => {
				console.log(err);
				alert('3'); 
			});
		}
	}

	getBookById(id){
		for(var i=0; i<this.books.length; i++){
			if(this.books[i].id == id){
				this.currentBook = this.books[i];
				return this.books[i];
			}
		}
		return false;
	}
}
