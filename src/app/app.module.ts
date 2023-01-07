import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {NgxEchartsModule} from "ngx-echarts";
import {HttpClientModule} from "@angular/common/http";
import {RouterModule, Routes} from "@angular/router";
import {FormsModule} from "@angular/forms";
import { HomeComponent } from './pages/home/home.component';
import { MainComponent } from './components/main/main.component';
import {environment} from "../environments/environment.prod";
import {DataTablesModule} from "angular-datatables";
import {NgxSpinnerModule} from "ngx-spinner";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

interface NgxSpinnerConfig {
  type?: string;
}

const routes: Routes = [
  { path: '', redirectTo: 'app/home', pathMatch: 'full' },
  { path: 'app', component: MainComponent, children: [
      {
        path: 'home', // child route path
        component: HomeComponent, // child route component that the router renders
      },
    ] },
];
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MainComponent
  ],
  imports: [
    NgxSpinnerModule.forRoot({ type: 'ball-scale-multiple' }),
    BrowserModule,
    NgbModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts')
    }),
    BrowserAnimationsModule,
    DataTablesModule,
    HttpClientModule,
    AppRoutingModule,
    RouterModule.forRoot(routes), FormsModule,
  ],
  providers: [{ provide: 'BASE_API_URL', useValue: environment.apiUrl },],
  bootstrap: [AppComponent]
})
export class AppModule { }
