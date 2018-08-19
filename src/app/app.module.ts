import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {RouteReuseStrategy, RouterModule} from '@angular/router';
import {SearchComponent} from './search.component';
import {EditComponent} from './edit.component';
import {SimpleReuseStrategy} from './simple-reuse-strategy';
import {NzAffixModule} from './nz-affix/nz-affix.module';
import {DemoReuseStrategy} from "./demo-reuse-strategy";


@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    EditComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    NzAffixModule,
    RouterModule.forRoot([
      {path: '', redirectTo: 'search', pathMatch: 'full'},
      {path: 'search', component: SearchComponent},
      {path: 'edit/:id', component: EditComponent}
    ])
  ],
  providers: [
    {provide: RouteReuseStrategy, useClass: DemoReuseStrategy}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
