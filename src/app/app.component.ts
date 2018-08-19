import {Component} from '@angular/core';
import {InteractiveService} from './interactive.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  storesLinks = [];

  constructor(private interactiveService: InteractiveService) {
  }

  oncloseMe() {
    console.log('closeMe');
  }

  testClick() {
    console.log('hahaahh');
    this.interactiveService.deleteEvent.emit('hahaahh');
  }
}
