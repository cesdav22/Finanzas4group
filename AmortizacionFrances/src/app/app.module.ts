import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './components/login/login.component';
import { SharedModule } from './components/shared/shared.module';
import { RegisterComponent } from './components/register/register.component';
import {FormsModule} from "@angular/forms";
import {UsersService} from "./components/services/users.service";
import {AmortizacionService} from "./components/services/amortizacion.service";

import {CommonModule} from "@angular/common";

import {MatGridListModule} from "@angular/material/grid-list";
import {MatCardModule} from "@angular/material/card";
import {InicioComponent} from "./components/inicio/inicio.component";
import {NavbarComponent} from "./components/navbar/navbar.component";
import {AmortizacionComponent} from "./components/amortizacion/amortizacion.component";
import {ReportesComponent} from "./components/reportes/reportes.component";
import {SeparadorMilesPipe} from "./components/amortizacion/separador-miles-pipe.pipe";
import {DesgravamenComponent} from "./components/desgravamen/desgravamen.component";
import {ObjToArrayPipe} from "./components/reportes/objToArray";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {VANTIRComponent} from "./components/vantir/vantir.component";
import {MatDialogModule} from "@angular/material/dialog";
import {DataSharingServiceService} from "./components/services/data-sharing-service.service";
import {MatSelectModule} from "@angular/material/select";





@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
      InicioComponent,
      NavbarComponent,
      AmortizacionComponent,
      ReportesComponent,
      SeparadorMilesPipe,
      DesgravamenComponent,
      ObjToArrayPipe,
      VANTIRComponent,

  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        SharedModule,
        FormsModule,
        CommonModule,
        SharedModule,
        MatGridListModule,
        FormsModule,
        MatCardModule,
        MatCheckboxModule,
        MatDialogModule,
        MatSelectModule
    ],
  providers: [UsersService, AmortizacionService, DataSharingServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
