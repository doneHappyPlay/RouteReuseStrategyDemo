import {Component, OnInit} from '@angular/core';
import {InteractiveService} from './interactive.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  storesLinks = [];

  constructor(private interactiveService: InteractiveService) {
  }

  ngOnInit() {
    this.interactiveService.storeEvent.subscribe((path) => {
      console.log(path);
      if (this.storesLinks.indexOf(path) === -1) {
        this.storesLinks.push(path);
      }
    });
  }

  closePath(path) {
    this.interactiveService.deleteEvent.emit(path);
    const index = this.storesLinks.indexOf(path);
    if (index > -1) {
      this.storesLinks.splice(index, 1);
    }
  }

}
