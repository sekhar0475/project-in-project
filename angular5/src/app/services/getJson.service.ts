import { Injectable, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Http, Response } from '@angular/http';

export interface Books {
  id: any;
  title: any;
  author: any;
  publisher: any;
  edition: any;
  ISBN: any;
  publishingDate: any;
  chapters: any;
}

@Injectable()
export class GetJSONService {
	constructor(
		private http:Http
	) {}

	public getBooks(): Observable<Books[]> {
    return this.http
	    .get('./assets/books.json')
	    .map((res:Response) => res.json());
  }

  public getAuthors(): Observable<Books[]> {
    return this.http
      .get('./assets/authors.json')
      .map((res:Response) => res.json());
  }

}