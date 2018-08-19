import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {RouteReuseStrategy, RouterModule} from '@angular/router';
import {SearchComponent} from './search.component';
import {EditComponent} from './edit.component';
import {SimpleReuseStrategy} from './simple-reuse-strategy';
import {NgZorroAntdModule, NZ_I18N, zh_CN} from 'ng-zorro-antd';
import {registerLocaleData} from '@angular/common';
import zh from '@angular/common/locales/zh';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {InteractiveService} from './interactive.service';

registerLocaleData(zh);


@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    EditComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      {path: '', redirectTo: 'search', pathMatch: 'full'},
      {path: 'search', component: SearchComponent},
      {path: 'login', component: LoginComponent},
      {path: 'register', component: RegisterComponent},
      {path: 'edit/:id', component: EditComponent}
    ]),
    NgZorroAntdModule
  ],
  providers: [
    {provide: RouteReuseStrategy, useClass: SimpleReuseStrategy},
    {provide: NZ_I18N, useValue: zh_CN}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
