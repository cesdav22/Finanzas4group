import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import {ReportesComponent} from "./components/dashboard/reportes/reportes.component";
import {AmortizacionComponent} from "./components/dashboard/amortizacion/amortizacion.component";
import {DesgravamenComponent} from "./components/dashboard/desgravamen/desgravamen.component";
import {RegisterComponent} from "./components/register/register.component";


const routes: Routes = [
  {path:'',redirectTo:'register',pathMatch:'full'},
  {path:'register',component: RegisterComponent},
  {path:'login',component:LoginComponent},
  {path:'amortizacion',component: AmortizacionComponent},
  {path:'reportes',component: ReportesComponent},
  {path:'desgravamen',component: DesgravamenComponent},
  // {path:'login',component: LoginComponent},
  {path:'dashboard',loadChildren:()=>import('./components/dashboard/dashboard.module').then(x=>x.DashboardModule)},
  {path:'logout',component: LoginComponent},
  {path:'**',redirectTo:'login',pathMatch:'full'},

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
