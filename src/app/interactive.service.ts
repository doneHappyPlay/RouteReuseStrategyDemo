import {EventEmitter, Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InteractiveService {

  deleteEvent = new EventEmitter<any>();
  storeEvent = new EventEmitter<any>();

  constructor() {
  }

}
