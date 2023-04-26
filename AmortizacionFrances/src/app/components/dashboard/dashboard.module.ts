import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { SharedModule } from '../shared/shared.module';
import { DashboardComponent } from './dashboard.component';
import { InicioComponent } from './inicio/inicio.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AmortizacionComponent } from './amortizacion/amortizacion.component';
import { ReportesComponent } from './reportes/reportes.component';

@NgModule({
  declarations: [
    DashboardComponent,
    InicioComponent,
    NavbarComponent,
    AmortizacionComponent,
    ReportesComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule
  ]
})
export class DashboardModule { }
