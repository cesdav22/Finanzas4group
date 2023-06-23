import { Component, OnInit } from '@angular/core';
import {MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {DecimalPipe, NgIf} from "@angular/common";
import {MatTableDataSource, MatTableModule} from "@angular/material/table";
import {Cuota} from "../../../interfaces/cuota";
import {UsersService} from "../../services/users.service";
import {DataSharingServiceService} from "../../services/data-sharing-service.service";
import {ReportFinal} from "../../../interfaces/report-final";

@Component({
  selector: 'app-dialog-content-example-dialog.html',
  templateUrl: './dialog-content-example-dialog.component.html',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, DecimalPipe, MatTableModule, NgIf],
})
export class DialogContentExampleDialog implements OnInit {

  reportsVANTIR: Cuota[] = [];
  lastReport: Cuota[] = [];

  dataSource: MatTableDataSource<any>;

  datos!: any[];

  cuotaxD: ReportFinal
  constructor(private loginService: UsersService, private dataSharingService: DataSharingServiceService) {
    this.dataSource = new MatTableDataSource<any>();
    this.cuotaxD = {} as ReportFinal;
  }

  columnasTabla: string[] = [
    'numero-cuota',
    'saldo-inicial',
    'saldo-final',
    'interes',
    'amortizacion',
    'plazo-gracia',
    'cuota',
    'desgravamen',
  ];

  ngOnInit(): void {
    // this.traerData();
    this.xd();
  }

  xd(){
    this.datos = this.dataSharingService.getData();
    this.dataSource.data = this.datos;
    console.log(`Los Datos desde la vista Van tir: ${JSON.stringify(this.datos)}`);
  }

  // traerData(){
  //   this.loginService.getReportByIdFromUser(Number(sessionStorage.getItem("user"))).subscribe((response: any) => {
  //     this.reportsVANTIR = response.content;
  //     this.dataSource.data = this.reportsVANTIR;
  //     console.log(`Los Datos desde la vista Van tir: ${JSON.stringify(this.reportsVANTIR)}`);
  //   });
  //
  //
  //   // for (let i = 0; i < this.reportsVANTIR.length; i++) {
  //   //   if(this.reportsVANTIR.at(i)!.cronograma == this.reportsVANTIR.at(this.reportsVANTIR.length - 1)!.cronograma) {
  //   //     this.lastReport.push(this.reportsVANTIR.at(i)!);
  //   //   }
  //   // }
  // }

  // cuota:number = 0;
  // calculateVAN(){
  //   console.log(this.datos.at(1));
  //   this.cuota = this.cuotaxD.amortizacion + this.cuotaxD.interes
  //
  //   // this.cuota/(1+)
  // }


}
