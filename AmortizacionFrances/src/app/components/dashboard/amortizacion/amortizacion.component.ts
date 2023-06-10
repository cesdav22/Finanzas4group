import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {Report} from "../../../interfaces/report";
import {AmortizacionService} from "../services/amortizacion.service";
import {MatTableDataSource} from "@angular/material/table";
// import * as jsPDF from "jspdf";
// @ts-ignore
import * as html2pdf from 'html2pdf.js';
import * as fs from "fs";
import {Cuota} from "../../../interfaces/cuota";


// export interface Cuota {
//   id:number;
//   numeroCuota?: number;
//   amortizacion?: number;
//   interes?: number;
//   desgravamen?: number;
//   cuota?: number;
//   saldoInicial?: number;
//   saldoFinal: number;
// }

@Component({
  selector: 'app-amortizacion',
  templateUrl: './amortizacion.component.html',
  styleUrls: ['./amortizacion.component.css']
})
export class AmortizacionComponent implements OnInit {


  cuotaData: Cuota ;
  reportData: Report;
  // dataSource: cuota[] = [];

  dataSource: MatTableDataSource<any>;
  dataSource2: MatTableDataSource<any> = new MatTableDataSource<any>([]);
  displayedColumns: string[] = ['id', 'nroCuota', 'amortizacion', 'interes', 'saldo', 'cuota'];

  capital: string = '';
  plazo: number = 0;

  tazaInteres: number = 0;
  interesMensual: number = 0;
  cuotaMensual: number = 0;
  cuotas: Cuota[] = [];
  totalAmortizacion: number = 0;
  totalInteres: number = 0;
  totalCuotas: number = 0;
  saldoInicial: number = 0;
  saldoFinal: number = 0;

  desgravamen: number = 0;

  columnasTabla: string[] = [
    'numero-cuota',
    'amortizacion',
    'interes',
    'desgravamen',
    'saldo-inicial',
    'saldo-final',
    'cuota',
  ];

  constructor(private _snackBar: MatSnackBar, private router: Router, private reportsService: AmortizacionService) {
    this.reportData = {} as Report;
    this.cuotaData = {} as Cuota;
    this.dataSource = new MatTableDataSource<any>();
    this.dataSource2.data = [];
  }

  ngOnInit() {
    // this.calcular();
    // this.addReport();
    // this.getAllReports();

  }


  // enviarTabla() {
  //   const tabla = [/* Aquí tienes tu tabla de datos */];
  //   this.router.navigate(['/destino'], { state: { tabla: tabla } });
  // }

  migrarTabla() {
    // const dataSource = this.dataSource; // Suponiendo que dataSource es el MatTableDataSource
    // this.router.navigate(['/reportes'], { queryParams: { dataSource: JSON.stringify(dataSource) } });
    this.router.navigate(['/reportes'])
  }

  procesar() {
    if (this.validaciones()) {
      return;
    } else {
      this.calcular();
      this.mostrarTabla()
      // this.addCuota()
    }
    //
    //
    // this.calcular();
    // this.mostrarTabla()
  }


  mostrarBoton = false;

  mostrarTabla() {
    // Lógica para mostrar la tabla
    this.mostrarBoton = true;
  }




  navigateTo() {
    // Aquí puedes definir la ruta a la que deseas navegar
    this.router.navigate(['/desgravamen']);
  }



  jsonData:any[] = [];


  reportData2! :[];
  amortizacion!:number
  calcular() {
    this.cerearVariables();

    this.tazaInteres = this.verificarDecimal(this.tazaInteres);

    //anual
    this.interesMensual = this.tazaInteres ;
    //mensual
    // this.interesMensual = this.tazaInteres/12 ;

    // this.cuotaMensual =
    //     ((this.interesMensual / 100) * Number(this.capital)) /
    //     (1 - Math.pow(1 / (1 + this.interesMensual / 100), this.plazo));

    this.cuotaMensual =
        (((this.interesMensual / 100) * Math.pow((1+ this.interesMensual/100), this.plazo))* Number(this.capital) /
        (Math.pow((1 + this.interesMensual / 100) , this.plazo) - 1));

    console.log(`plazo: ${this.plazo}`)
    console.log(`cuota mensual xd: ${this.cuotaMensual}`)

    // this.cuotaMensual = this.cuotaMensual; // Redondeo


    this.saldoFinal = Number(this.capital);
    this.saldoInicial = Number(this.capital);



    console.log(`saldo: ${this.saldoFinal}`)
    for (let cuotaIndex = 1; cuotaIndex <= this.plazo; cuotaIndex++) {

      let cuota: Cuota = {
        id:cuotaIndex,
        numeroCuota: cuotaIndex,
        saldoInicial: this.saldoInicial,
        saldoFinal: this.saldoFinal,


      };

      // Interes de la cuota
      console.log(`cuota saldo: ${cuota.saldoFinal}`)
      // cuota.interes = Math.round((cuota.saldo / 100) * this.interesMensual);
      cuota.interes = cuota.saldoFinal * (this.interesMensual/100);

      // Amortizacion de la cuota
      cuota.amortizacion = this.cuotaMensual - cuota.interes;

      cuota.cuota = this.cuotaMensual;

      cuota.desgravamen = Math.round(cuota.saldoFinal * (0.044/100));



      // if (cuotaIndex == this.plazo) {
      //   cuota.amortizacion = this.saldoFinal;
      //   cuota.cuota = cuota.amortizacion + cuota.interes;
      // }
      // this.amortizacion = cuota.amortizacion;
      // Saldo de la cuota
      this.saldoFinal = this.saldoInicial - cuota.amortizacion;
      this.saldoInicial = this.saldoFinal;

      this.totalAmortizacion = this.totalAmortizacion + cuota.amortizacion;
      this.totalInteres = this.totalInteres + cuota.interes;
      this.totalCuotas = this.totalAmortizacion + this.totalInteres;



      this.cuotas.push(cuota);
      cuota.saldoFinal = cuota.saldoFinal - cuota.amortizacion;



      // this.desgravamen = 0.2;

      // this.reportData.amortizacion = this.totalAmortizacion;
      // this.reportData.interes = this.interesMensual;
      // this.reportData.saldo = this.saldo;
      // this.reportData.cuota = this.cuotaMensual;
      // this.reportData.desgravamen = this.desgravamen;

      // @ts-ignore
      this.jsonData.push(cuota);
      // this.jsonData.push({ id: cuotaIndex, cuota });
      console.log(this.reportData.amortizacion );
      console.log(this.reportData.interes);
      console.log(this.reportData.saldo );
      console.log(this.reportData.cuota );

    }

    // this.reportData = jsonData;
    console.log(JSON.stringify(this.jsonData));
    // this.reportData.nroCuota = this.cuotas;
    this.reportData.amortizacion = this.totalAmortizacion;
    this.reportData.interes = this.totalInteres;
    this.reportData.saldo = this.saldoFinal;
    this.reportData.cuota = this.totalCuotas;
    this.reportData.desgravamen = this.desgravamen;
    console.log(this.reportData.amortizacion);
    this.dataSource.data = this.cuotas;
    // this.dataSource2.data = this.cuotas;
    // @ts-ignore
    this.dataSource2 = JSON.stringify(this.jsonData);
    console.log(this.dataSource2)
    // this.dataSource = this.totalAmortizacion, this.interesMensual, this.saldo, this.cuotaMensual;

    // this.cuotaData.numeroCuota = 0;
    // this.reportsService.create(this.cuotaData).subscribe((response: any) => {
    //   this.dataSource2.data.push({...response});
    //   this.dataSource2.data = this.dataSource2.data.map((o: any) => { return o});
    // });
    this.addCuota()
  }


  // guardarEnDB() {
  //   const jsonDataString = JSON.stringify(this.jsonData, null, 2);
  //   fs.writeFileSync('db.json', jsonDataString, 'utf-8');
  // }



  cerearVariables() {
    this.cuotaMensual = 0;
    this.saldoFinal = 0;
    this.cuotas = [];

    this.totalAmortizacion = 0;
    this.totalInteres = 0;
    this.totalCuotas = 0;
  }

  verificarDecimal(num: any) {
    return parseFloat(num.toString().replaceAll(',', '.'));
  }

  parseSeparadorMiles(valor: any) {
    if (Number(valor).toString() == 'NaN') {
      console.log('El valor ingresado no es un número.');
      this.capital = '';
    }

    valor = valor.toString().replaceAll('.', '');
    this.capital = Number(valor).toLocaleString('es-AR');
  }

  // parsearAEntero(numString: any) {
  //   return parseInt(numString.replaceAll('.', ''));
  // }

  validaciones() {
    const capital = Number(this.capital);
    var regExp = /[a-zA-Z]/g;
    var testString = capital.toString();

    if (regExp.test(testString)) {
      this.openSnackBar('Monto no válido !');
      return true;
    }
    if(capital<64200 || capital> 464200){
      this.openSnackBar('Monto no válido !');
      return true;
    }

    if (this.plazo == 0) {
      this.openSnackBar('Plazo no válido !');
      return true;
    }

    if (this.tazaInteres <= 0) {
      this.openSnackBar('Tasa no válida !');
      return true;
    }

    return false;
  }

  openSnackBar(mensaje: string) {
    this._snackBar.open(mensaje, '', {
      duration: 2000,
    });
  }


  //service
  addReport() {
    this.reportData.id = 0;
    this.reportsService.create(this.reportData).subscribe((response: any) => {
      this.dataSource.data.push({...response});
      this.dataSource.data = this.dataSource.data.map((o: any) => { return o});
    });
  }

  //para el ultimo Id - si con create xD
  // addCuota() {
  //   this.cuotaData.id = 0;
  //   this.reportsService.create(this.cuotaData).subscribe(response=> {});
  // }
  addCuota() {
    // if (this.dataSource2.data?.push) {
      this.cuotaData.id = 0;
      this.reportsService.create(this.jsonData).subscribe(response => {});
    // }
  }


  getAllReports() {
    this.reportsService.getAll().subscribe((response: any) => {
      this.dataSource.data = response;
    });
  }



  //download pdf
  // @ts-ignore
  @ViewChild('contentToExport') contentToExport: ElementRef;

  public downloadAsPDF(): void {
    const options = {
      filename: 'archivo.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    html2pdf()
        .from(this.contentToExport.nativeElement)
        .set(options)
        .save();
  }


















}
