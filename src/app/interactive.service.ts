import {EventEmitter, Injectable} from '@angular/core';
import {Observable} from 'rxjs/index';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InteractiveService {

  deleteEvent = new EventEmitter<any>();
  storeEvent = new EventEmitter<any>();

  constructor(private http: HttpClient) {
  }

  getList(): Observable<any> {
    return this.http.get('assets/data.json');
  }

}
