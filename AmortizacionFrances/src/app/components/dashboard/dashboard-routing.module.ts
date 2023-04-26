import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { InicioComponent } from './inicio/inicio.component';
import { AmortizacionComponent } from './amortizacion/amortizacion.component';
import { ReportesComponent } from './reportes/reportes.component';

const routes: Routes = [
  {path:'',component:DashboardComponent,children:[
    {path:'',component:InicioComponent},
    {path:'amortizacion',component:AmortizacionComponent},
    {path:'reportes',component:ReportesComponent}
  ]

}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
