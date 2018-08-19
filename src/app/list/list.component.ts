import {Component, OnInit} from '@angular/core';
import {InteractiveService} from '../interactive.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  data;

  constructor(private interactive: InteractiveService) {
  }

  ngOnInit() {
    this.interactive.getList().subscribe(res => {
      console.log(res);
      this.data = res;
    });
  }

}
