import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {Report} from "../../../interfaces/report";
import {AmortizacionService} from "../services/amortizacion.service";
import {MatTableDataSource} from "@angular/material/table";
// import * as jsPDF from "jspdf";
// @ts-ignore
import * as html2pdf from 'html2pdf.js';


export interface cuota {
  numeroCuota?: number;
  amortizacion?: number;
  interes?: number;
  desgravamen?: number;
  cuota?: number;
  saldo: number;
}

@Component({
  selector: 'app-amortizacion',
  templateUrl: './amortizacion.component.html',
  styleUrls: ['./amortizacion.component.css']
})
export class AmortizacionComponent implements OnInit {

  reportData: Report;
  // dataSource: cuota[] = [];

  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['id', 'nroCuota', 'amortizacion', 'interes', 'saldo', 'cuota'];

  capital: string = '';
  plazo: number = 0;

  tazaInteres: number = 0;
  interesMensual: number = 0;
  cuotaMensual: number = 0;
  cuotas: cuota[] = [];
  totalAmortizacion: number = 0;
  totalInteres: number = 0;
  totalCuotas: number = 0;
  saldo: number = 0;

  desgravamen: number = 0.8;

  columnasTabla: string[] = [
    'numero-cuota',
    'amortizacion',
    'interes',
    'desgravamen',
    'saldo',
    'cuota',
  ];

  constructor(private _snackBar: MatSnackBar, private router: Router, private reportsService: AmortizacionService) {
    this.reportData = {} as Report;
    this.dataSource = new MatTableDataSource<any>();
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
      this.addReport();
    }
  }

  navigateTo() {
    // Aquí puedes definir la ruta a la que deseas navegar
    this.router.navigate(['/desgravamen']);
  }

  reportData2! :[];
  calcular() {
    this.cerearVariables();

    this.tazaInteres = this.verificarDecimal(this.tazaInteres);

    //anual
    this.interesMensual = this.tazaInteres ;
    //mensual
    // this.interesMensual = this.tazaInteres/12 ;

    this.cuotaMensual =
        ((this.interesMensual / 100) * this.parsearAEntero(this.capital)) /
        (1 - Math.pow(1 / (1 + this.interesMensual / 100), this.plazo));

    this.cuotaMensual = Math.round(this.cuotaMensual); // Redondeo

    this.saldo = this.parsearAEntero(this.capital);
    for (let cuotaIndex = 1; cuotaIndex <= this.plazo; cuotaIndex++) {
      let cuota: cuota = {
        numeroCuota: cuotaIndex,
        saldo: this.saldo,
      };

      // Interes de la cuota
      cuota.interes = Math.round((cuota.saldo / 100) * this.interesMensual);

      // Amortizacion de la cuota
      cuota.amortizacion = this.cuotaMensual - cuota.interes;

      cuota.cuota = this.cuotaMensual;

      //desgravamen

      // @ts-ignore
      this.desgravamen = this.capital * ((Math.pow((1 + (0.044 / 100)),30)) - 1)

      this.desgravamen = this.desgravamen - 0.01;
      cuota.desgravamen = this.desgravamen;



      if (cuotaIndex == this.plazo) {
        cuota.amortizacion = this.saldo;
        cuota.cuota = cuota.amortizacion + cuota.interes;
      }

      // Saldo de la cuota
      this.saldo = this.saldo - cuota.amortizacion;

      this.totalAmortizacion = this.totalAmortizacion + cuota.amortizacion;
      this.totalInteres = this.totalInteres + cuota.interes;
      this.totalCuotas = this.totalAmortizacion + this.totalInteres;

      this.cuotas.push(cuota);

      cuota.saldo = cuota.saldo - cuota.amortizacion;

      // this.desgravamen = 0.2;

      this.reportData.amortizacion = this.totalAmortizacion;
      this.reportData.interes = this.interesMensual;
      this.reportData.saldo = this.saldo;
      this.reportData.cuota = this.cuotaMensual;
      this.reportData.desgravamen = this.desgravamen;

      console.log(this.reportData.amortizacion );
      console.log(this.reportData.interes);
      console.log(this.reportData.saldo )
      console.log(this.reportData.cuota );

    }

    // this.reportData.nroCuota = this.cuotas;
    this.reportData.amortizacion = this.totalAmortizacion;
    this.reportData.interes = this.totalInteres;
    this.reportData.saldo = this.saldo;
    this.reportData.cuota = this.totalCuotas;
    this.reportData.desgravamen = this.desgravamen;
    console.log(this.reportData.amortizacion);
    this.dataSource.data = this.cuotas;
    // this.dataSource = this.totalAmortizacion, this.interesMensual, this.saldo, this.cuotaMensual;
  }

  cerearVariables() {
    this.cuotaMensual = 0;
    this.saldo = 0;
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

  parsearAEntero(numString: any) {
    return parseInt(numString.replaceAll('.', ''));
  }

  validaciones() {
    const capital = this.parsearAEntero(this.capital);
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
