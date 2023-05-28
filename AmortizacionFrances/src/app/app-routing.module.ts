import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import {ReportesComponent} from "./components/dashboard/reportes/reportes.component";
import {AmortizacionComponent} from "./components/dashboard/amortizacion/amortizacion.component";


const routes: Routes = [
  {path:'',redirectTo:'login',pathMatch:'full'},
  {path:'login',component:LoginComponent},
  {path:'amortizacion',component: AmortizacionComponent},
  {path:'reportes',component: ReportesComponent},
  {path:'dashboard',loadChildren:()=>import('./components/dashboard/dashboard.module').then(x=>x.DashboardModule)},
  {path:'**',redirectTo:'login',pathMatch:'full'}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
