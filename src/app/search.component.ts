import {Component} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-search',
  template: `
    <div style="height: 3000px;">
      <p><strong>Search List</strong></p>
      <input type="text" [(ngModel)]="q" placeholder="email, keywords: ab">
      <button (click)="search()">Search</button>
      <table class="table mt-3" *ngIf="list.length > 0">
        <thead>
        <tr>
          <th>name</th>
          <th>email</th>
          <th>gender</th>
          <th></th>
        </tr>
        </thead>
        <tbody>
        <tr *ngFor="let i of list">
          <th>{{i.name.last}} {{i.name.first}}</th>
          <th>{{i.email}}</th>
          <th>{{i.gender}}</th>
          <th><a [routerLink]="['/edit', i.login.md5]">edit</a></th>
        </tr>
        </tbody>
      </table>
      <!--<app-nz-affix>-->
        <!--<button>-->
          <!--<span>Affix top</span>-->
        <!--</button>-->
      <!--</app-nz-affix>-->
    </div>
  `,
})
export class SearchComponent {
  q = '';
  list: any[] = [];

  constructor(private http: HttpClient) {
    console.log('constructor', 'search page');
  }

  search() {
    this.http
      .get(`./assets/data.json`).pipe(
      map((res: any[]) => {
        console.log('load data');
        return res.filter(w => w.email.includes(this.q));
      })
    )
      .subscribe(res => {
        console.log(res);
        this.list = res;
      });
  }
}
