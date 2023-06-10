import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './components/login/login.component';
import { SharedModule } from './components/shared/shared.module';
import { RegisterComponent } from './components/register/register.component';
import {FormsModule} from "@angular/forms";
import {UsersService} from "./components/dashboard/services/users.service";
import {AmortizacionService} from "./components/dashboard/services/amortizacion.service";
import {DashboardModule} from "./components/dashboard/dashboard.module";




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        SharedModule,
        FormsModule,
        DashboardModule
    ],
  providers: [UsersService, AmortizacionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
