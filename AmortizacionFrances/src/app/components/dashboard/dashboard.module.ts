import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { SharedModule } from '../shared/shared.module';
import { DashboardComponent } from './dashboard.component';
import { InicioComponent } from './inicio/inicio.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AmortizacionComponent } from './amortizacion/amortizacion.component';
import { ReportesComponent } from './reportes/reportes.component';
import {MatGridListModule} from "@angular/material/grid-list";
import {FormsModule} from "@angular/forms";
import {SeparadorMilesPipe} from "./amortizacion/separador-miles-pipe.pipe";
import { DesgravamenComponent } from './desgravamen/desgravamen.component';
import {MatCardModule} from "@angular/material/card";
import {ObjToArrayPipe} from "./reportes/objToArray";

@NgModule({
    declarations: [
        DashboardComponent,
        InicioComponent,
        NavbarComponent,
        AmortizacionComponent,
        ReportesComponent,
        SeparadorMilesPipe,
        DesgravamenComponent,
        ObjToArrayPipe
    ],
    imports: [
        CommonModule,
        DashboardRoutingModule,
        SharedModule,
        MatGridListModule,
        FormsModule,
        MatCardModule
    ]
})
export class DashboardModule { }
