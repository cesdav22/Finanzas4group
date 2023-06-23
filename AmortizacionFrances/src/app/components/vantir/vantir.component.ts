import { Component, OnInit } from '@angular/core';
import {UsersService} from "../services/users.service";
import {Cuota} from "../../interfaces/cuota";
import {MatDialog, MatDialogConfig, MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {DialogContentExampleDialog} from "./dialog-content-example-dialog.html/dialog-content-example-dialog.component";
import {MatTableDataSource} from "@angular/material/table";
import {DataSharingServiceService} from "../services/data-sharing-service.service";

@Component({
  selector: 'app-vantir',
  templateUrl: './vantir.component.html',
  styleUrls: ['./vantir.component.css']
})
export class VANTIRComponent implements OnInit {


  reports: Cuota[] = [];
  reportsVANTIR: Cuota[] = [];
  dataSource: MatTableDataSource<any>;
  constructor(private loginService: UsersService, public dialog: MatDialog, private dataSharingService: DataSharingServiceService) {
    this.dataSource = new MatTableDataSource<any>();
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
    this.loginService.getReportByIdFromUser(Number(sessionStorage.getItem("user"))).subscribe((response: any) => {
      this.reports = response.content;
    });
    console.log(`Los Datos desde la vista Van tir: ${this.reports}`);
  }

  // calculoVan(){
  //
  // }

  openDialog() {
    // const dialogConfig = new MatDialogConfig();
    // dialogConfig.width = '500px'; // Establece el ancho a 500 píxeles
    // this.traerData();
    this.enviarDatos();
    const dialogRef = this.dialog.open(DialogContentExampleDialog);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  enviarDatos() {
    const datos = this.reports;
    this.dataSharingService.setData(datos);
  }

  // traerData() {
  //   this.loginService.getReportByIdFromUser(Number(sessionStorage.getItem("user")))
  //       .subscribe((response: any) => {
  //         this.reportsVANTIR = response.content;
  //         this.dataSource.data = this.reportsVANTIR;
  //         console.log(`Los Datos desde la vista Van tir: ${JSON.stringify(this.reportsVANTIR)}`);
  //       });
  //
  // }
}


// @Component({
//   selector: 'dialog-content-example-dialog',
//   templateUrl: 'dialog-content-example-dialog.html',
//   standalone: true,
//   imports: [MatDialogModule, MatButtonModule],
// })
// export class DialogContentExampleDialog {}