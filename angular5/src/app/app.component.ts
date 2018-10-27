import { Component, OnInit } from '@angular/core';
import { GetJSONService, Books } from './services/getJson.service';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'app-root',
  template: `<router-outlet></router-outlet>`,
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
	constructor(
	  private jsonService: GetJSONService
	) {}

	title = 'app';
	books: any = [];

	ngOnInit() {
		// console.log(this.jsonService.test);
		// this.jsonService.getBooks().subscribe((data) => {
		// 	this.books = data;
		// 	console.log(data);
		// 	// alert('2');
		// }, 
		// (err) => {
		// 	console.log(err);
		// 	alert('3'); 
		// });

	}
}
