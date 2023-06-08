import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {MatTableDataSource} from "@angular/material/table";
import {AmortizacionService} from "../services/amortizacion.service";
import {Report} from "../../../interfaces/report";
import {ReportFinal} from "../../../interfaces/report-final";

// export interface PeriodicElement {
//   name: string;
//   position: number;
//   weight: number;
//   symbol: string;
// }
//
// const ELEMENT_DATA: PeriodicElement[] = [
//   {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
//   {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
//   {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
//   {position: 4, name: 'Beryllium', weight: 9.0122, symbol: ' Be'},
//   {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
//   {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
//   {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
//   {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
//   {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
//   {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
// ];

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent implements OnInit {

  displayedColumns!: string[];
  dataSource: MatTableDataSource<any>;
  reportData: Report;
  a:any;
  b:any;
  constructor(private route: ActivatedRoute, private reportsService: AmortizacionService) {
    this.dataSource = new MatTableDataSource<any>();
    this.reportData = {} as Report;
  }
  columnasTabla: string[] = [
    'id',
    'numero-cuota',
    'amortizacion',
    'interes',
    'desgravamen',
    'saldo',
    'cuota',
  ];

  ngOnInit() {
    // this.displayedColumns = ['column1', 'column2', 'column3'];
    // this.route.queryParams.subscribe(params => {
    //   const dataSourceString = params['dataSource'];
    //   const dataSource = JSON.parse(dataSourceString);
    //   this.dataSource = new MatTableDataSource<any>(dataSource);
    // });

   this.getReport()
   // this.getAllPatients()
  }

  // displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  // dataSource = ELEMENT_DATA;


  //borrar


  // getAllPatients() {
  //   this.reportsService.getAll().subscribe((response: any) => {
  //     this.b.id = response.id;
  //     console.log(this.b.id);
  //   });
  // }

  getReport() {
    // this.reportsService.getAll().subscribe((response: any) => {
    //   this.dataSource.data = response;
    //   console.log(response);
    // });

    // this.reportData.nroCuota = 0;
    this.reportsService.getById(1).subscribe((response:any)=> {
      this.a = response;
      // console.log(response);
      // this.router.navigate(['/infoPatientSpecific/${id}'],this.a)
      // console.log(this.a);
      console.log(this.a);
      //   this.dataSource.data = this.a;
      // console.log(this.dataSource);
      // response.nroCuota = 0;

      // this.dataSource.data = this.a;
      // console.log(this.dataSource.data);
    })

    //
    // this.reportsService.getLastId(this.b).subscribe((lastId: number) => {
    //   this.reportsService.getById(lastId).subscribe((response: any) => {
    //     this.a = response;
    //   });
    // });



  }







}
