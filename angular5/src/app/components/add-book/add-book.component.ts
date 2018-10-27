import { Component, EventEmitter, Input, Output, OnInit, ViewEncapsulation } from '@angular/core';
import { GetJSONService, Books } from '../../services/getJson.service';
import { Observable } from 'rxjs/Rx';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormControl, FormGroupDirective, NgForm, Validators, FormGroup } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

export class MyErrorStateMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
        const isSubmitted = form && form.submitted;
        return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
    }
}

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AddBookComponent implements OnInit {
	constructor(
	  private jsonService: GetJSONService,
	  private route: ActivatedRoute,
	  private router: Router
	) {}

	title = 'app';
	newBook = {
		id: "",
		title: "",
		author: "",
		ISBN: "",
		edition: "",
		publisher: "",
		publishingDate: new Date(),
		chapters: []
	};
	books: any = [];
	id: any;
	chapters = [];
	authors:any = [];
	selectedAuthor:any;

	//Form Controls
	titleFC = new FormControl;
	authorFC = new FormControl;
	isbnFC = new FormControl;


	@Input() titleInput: string;

	@Output() outputEvent = new EventEmitter();



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



		alert(this.titleInput);
		this.outputEvent.emit('test output value');
	}

	authorChanged($event){
		for(var i=0; i<this.authors.length; i++){
			if(this.authors[i].givenName == this.selectedAuthor){
				this.newBook.author = this.authors[i];
			}
		}
	}

	processBasicInfo(){
		if(this.validate()){
			this.newBook.chapters = this.chapters;
			this.newBook.publisher = "Me";
			if(!this.newBook.chapters.length){
				alert('Please add chapters');
				return;
			}else{
				for(var i=0; i<this.newBook.chapters.length; i++){
					if(!this.newBook.chapters[i].title){
						alert('Please enter the chapter title');
						return;
					}
				}
				this.setId();
				this.addToLocal();
			}
		}else{
			alert('Please enter all required fields');
		}
	}

	setId(){
		let bool = true
		let id =1;
		do {
			if(!this.hadId(id)){
				this.newBook.id = id+"";
				bool = false;
			}
			id = id + 1;
		} while (bool);
	}

	hadId(id){
		for(var i=0; i<this.books.length; i++){
			if(this.books[i].id == id){
				return true;
			}
		}
		return false;
	}

	addToLocal(){
		console.log(this.newBook);
		this.books.push(this.newBook);
		let booksInLocal = JSON.parse(localStorage.getItem('books'));
		booksInLocal.push(this.newBook);
		localStorage.setItem('books', JSON.stringify(booksInLocal));
		this.router.navigate(['/books-list']);
	}

	validate(){
		if((!this.newBook.title) || (!this.newBook.author) || (!this.newBook.ISBN) ){
			return false;
		}else{
			return true;
		}
	}

	addChap(){
		this.chapters.push({
			title: "Chapter Name",
			startPage: "0",
			numberOfPages: "0"
		});
	}
}
