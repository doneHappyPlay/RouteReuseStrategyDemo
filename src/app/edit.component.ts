/**
 * Created by dhp on 2018/8/15.
 */
import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-edit',
  template: `
    <h2>edit</h2>
    <div *ngIf="i">
      <div class="form-group row">
        <label class="col-sm-2 col-form-label">Name</label>
        <div class="col-sm-10"><p class="form-control-plaintext">{{i.name.last}} {{i.name.first}}</p></div>
      </div>
      <div class="form-group row">
        <label class="col-sm-2 col-form-label">Email</label>
        <div class="col-sm-10"><p class="form-control-plaintext">{{i.email}}</p></div>
      </div>
      <div class="form-group row">
        <label class="col-sm-2 col-form-label">gender</label>
        <div class="col-sm-10"><p class="form-control-plaintext">{{i.gender}}</p></div>
      </div>
      <div class="form-group row">
        <label class="col-sm-2 col-form-label">username</label>
        <div class="col-sm-10"><p class="form-control-plaintext">{{i.login.username}}</p></div>
      </div>
      <button (click)="save()" class="btn btn-primary">Save</button>
    </div>
  `
})
export class EditComponent implements OnInit {
  id: string;
  i: any;

  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params.subscribe(p => {
      this.id = p['id'];
      this.get();
    });
  }

  get() {
    this.http
      .get(`./assets/data.json`)
      .pipe(
        map((res: any[]) => {
          return res.find(w => w.login.md5 === this.id);
        })
      )
      .subscribe(res => {
        console.log(res);
        this.i = res;
      });
  }

  save() {
    this.router.navigate(['/search']);
  }
}
