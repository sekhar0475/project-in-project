import { Component, OnInit, ViewEncapsulation } from '@angular/core';
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
  selector: 'app-edit',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class EditComponent implements OnInit {
	constructor(
	  private jsonService: GetJSONService,
	  private route: ActivatedRoute,
	  private router: Router
	) {}

	title = 'app';
	books: any = [];
	chapters = [];
	authors:any = [];
	selectedAuthor:any;
	currentBook: any;
	id: any;

	//Form Controls
	titleFC = new FormControl;
	authorFC = new FormControl;
	isbnFC = new FormControl;

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
	}

	getBookById(id){
		for(var i=0; i<this.books.length; i++){
			if(this.books[i].id == id){
				this.currentBook = this.books[i];
				this.chapters = this.books[i].chapters;
				this.selectedAuthor = this.currentBook.author.givenName;
				return this.books[i];
			}
		}
		return false;
	}

	authorChanged($event){
		for(var i=0; i<this.authors.length; i++){
			if(this.authors[i].givenName == this.selectedAuthor){
				this.currentBook.author = this.authors[i];
			}
		}
	}

	processBasicInfo(){
		if(this.validate()){
			this.currentBook.chapters = this.chapters;
			this.currentBook.publisher = "Me";
			if(!this.currentBook.chapters.length){
				alert('Please add chapters');
				return;
			}else{
				for(var i=0; i<this.currentBook.chapters.length; i++){
					if(!this.currentBook.chapters[i].title){
						alert('Please enter the chapter title');
						return;
					}
				}
				this.currentBook.id = this.id;
				this.editInLocal();
			}
		}else{
			alert('Please enter all required fields');
		}
	}

	editInLocal(){
		console.log(this.currentBook);
		for(var i=0; i<this.books.length; i++){
			if(this.books[i].id == this.currentBook.id){
				this.books[i] = this.currentBook;
			}
		}
		localStorage.setItem('books', JSON.stringify(this.books));
		this.router.navigate(['/book', this.id]);
	}

	validate(){
		if((!this.currentBook.title) || (!this.currentBook.author) || (!this.currentBook.ISBN) ){
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
