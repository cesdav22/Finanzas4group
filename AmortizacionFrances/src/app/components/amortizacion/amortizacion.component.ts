import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {Report} from "../../interfaces/report";
import {AmortizacionService} from "../services/amortizacion.service";
import {MatTableDataSource} from "@angular/material/table";
// import * as jsPDF from "jspdf";
// @ts-ignore
import * as html2pdf from 'html2pdf.js';
import * as fs from "fs";
import {Cuota} from "../../interfaces/cuota";
import {UsersService} from "../services/users.service";
import {User} from "../../interfaces/user";
import {ReportFinal} from "../../interfaces/report-final";


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













  ///----------........................................----------------------

  cuotaData: Cuota ;
  reportData: Report;

  reportDataFinal: ReportFinal;
  // dataSource: cuota[] = [];

  dataSource: MatTableDataSource<any>;
  dataSource2: MatTableDataSource<any> = new MatTableDataSource<any>([]);
  displayedColumns: string[] = ['id', 'nroCuota', 'amortizacion', 'interes', 'saldo', 'cuota'];

  exponente : number = 0 ;

  // capital: string = '';
  capital: number = 0;
  capital2: number = 0;
  plazo: number = 0;

  cuotaInicial: number = 0;
  frecuencia: string = '';

  tazaInteres: number = 0;
  tazaInteres2: number = 0;

  plazoGraciaPeriodo:number = 0;

  banco: string = "";
  banco2: string = "";

  interesMensual: number = 0;
  cuotaMensual: number = 0;
  cuotas: Cuota[] = [];
  totalAmortizacion: number = 0;
  totalInteres: number = 0;
  totalCuotas: number = 0;
  saldoInicial: number = 0;
  saldoFinal: number = 0;

  plazoGracia:string = 'P';

  desgravamen: number = 0;

  columnasTabla: string[] = [
    'numero-cuota',
    'TEA',
    'TES',
    'plazo-gracia',
    'saldo-inicial',
    'interes',
    'cuota',
    'amortizacion',
    'saldo-final',
    'desgravamen',

  ];

  currentUser: number;
  constructor(private _snackBar: MatSnackBar, private router: Router, private reportsService: AmortizacionService, private loginService : UsersService) {
    this.reportData = {} as Report;
    this.cuotaData = {} as Cuota;
    this.reportDataFinal = {} as ReportFinal;
    this.dataSource = new MatTableDataSource<any>();
    this.dataSource2.data = [];
    this.currentUser = Number(sessionStorage.getItem("typeId"));
  }
  users: User[]=[];
  reports: Cuota[] = [];
  lastReport: Cuota[] = []
  getAllUsers() {
    this.loginService.getAll().subscribe((response: any) => {
      this.users = response.content;
    });
  }



  ngOnInit() {
    // this.calcular();
    // this.addReport();
    // this.getAllReports();
    this.loginService.getReportByIdFromUser(Number(sessionStorage.getItem("user"))).subscribe((response: any) => {
      this.reports = response.content;
      console.log(`Imprimiendo Reports: ${JSON.stringify(this.reports)}`);
    });




    //ultima tabla
    // for (let i = 0; i < this.reports.length; i++) {
    //   if(this.reports.at(i)!.cronograma == this.reports.at(this.reports.length - 1)!.cronograma) {
    //     this.lastReport.push(this.reports.at(i)!);
    //   }
    // }




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
      console.log(`This is a reports of user: "  ${JSON.stringify(this.reports)}`);
      // this.addCuota()
    }


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

  valorCuota: number = 0;
  valorCuotaIndex: number = 0;
  sumaDeValoresCuotaIndex: number = 0;
  resultadoVAN: number = 0;





  reportData2! :[];
  amortizacion!:number
  calcular() {
    console.log(`BANCO SIN UPPER CASE XD: ${this.banco}`)
    this.banco2  = this.banco.toUpperCase();
    console.log(`BANCO CON UPPER CASE XD: ${this.banco2}`)
    this.cerearVariables();



    // this.capital2 = Number(this.capital)*((100-(this.cuotaInicial))/100);
    this.cuotaInicial = (this.cuotaInicial/100) * Number(this.capital);
    console.log(`CUOTA INICIAL: ${this.cuotaInicial}`)
    this.capital2 = this.capital - this.cuotaInicial;

    console.log(`CAPITAL 2: ${this.capital2}`)

    // this.tazaInteres = this.verificarDecimal(this.tazaInteres);

    this.tazaInteres2 = ((Math.pow((1 + (this.tazaInteres)/100), 0.5)) - 1) * 100 ;
    console.log(`TASA DE INTERES: ${this.tazaInteres}`)
    //anual
    this.interesMensual = this.tazaInteres2 ;
    //mensual
    // this.interesMensual = this.tazaInteres/12 ;

    // this.cuotaMensual =
    //     ((this.interesMensual / 100) * Number(this.capital)) /
    //     (1 - Math.pow(1 / (1 + this.interesMensual / 100), this.plazo));

    this.exponente = 360/180;
    this.plazo = 2*this.plazo;

    this.cuotaMensual =
        (((this.interesMensual / 100) * Math.pow((1+ this.interesMensual/100), this.plazo))* this.capital2 /
        (Math.pow((1 + this.interesMensual / 100) , this.plazo) - 1));

    console.log(`plazo: ${this.plazo}`)
    console.log(`CUOTA MENSUAL xd: ${this.cuotaMensual}`)

    // this.cuotaMensual = this.cuotaMensual; // Redondeo


    this.saldoFinal = this.capital2;
    this.saldoInicial = this.capital2;



    console.log(`saldo: ${this.saldoFinal}`)
    for (let cuotaIndex = 1; cuotaIndex <= this.plazo; cuotaIndex++) {

      let cuota: Cuota = {

        // cronograma: 0,
        //
        // plazoGracia: "",
        // id:cuotaIndex,
        numeroCuota: cuotaIndex,
        saldoInicial: this.saldoInicial,
        saldoFinal: this.saldoFinal


      };

      // Interes de la cuota
      console.log(`cuota saldo: ${cuota.saldoFinal}`)
      // cuota.interes = Math.round((cuota.saldo / 100) * this.interesMensual);
      cuota.interes = cuota.saldoInicial * (this.interesMensual/100);
      console.log(`interes: ${cuota.interes}`)
      // Amortizacion de la cuota
      cuota.amortizacion = this.cuotaMensual - cuota.interes;
      console.log(`AMORTIZACION: ${cuota.amortizacion}`)

      cuota.cuota = this.cuotaMensual;

      //SEGUN BANCOS
      if(this.banco2 == "BCP"){
        cuota.desgravamen = Math.round(cuota.saldoFinal * (0.044/100));
      }else if(this.banco2 == "MAYNAS"){
        cuota.desgravamen = Math.round(cuota.saldoFinal * (0.00070));
      }else if(this.banco2 == "ICA"){
        cuota.desgravamen = Math.round(cuota.saldoFinal * (0.00065/100));
      }else if(this.banco2 == "TRUJILLO"){
        cuota.desgravamen = Math.round(cuota.saldoFinal * (0.1080/100));
      }else if(this.banco2 == "BBVA"){
        cuota.desgravamen = Math.round(cuota.saldoFinal * (0.04396/100));
      }else if(this.banco2 == "INTERBANK"){
        cuota.desgravamen = Math.round(cuota.saldoFinal * (0.028/100));
      }else if(this.banco2 == "SCOTIABANK"){
        cuota.desgravamen = Math.round(cuota.saldoFinal * (0.0600/100));
      }else if(this.banco2 == "PICHINCHA"){
        cuota.desgravamen = Math.round(cuota.saldoFinal * (0.0800/100));
      }else if(this.banco2 == "GNB"){
        cuota.desgravamen = Math.round(cuota.saldoFinal * (0.027/100));
      }else if(this.banco2 == "COMERCIO"){
        cuota.desgravamen = Math.round(cuota.saldoFinal * (0.75/100));
      }else if(this.banco2 == "BANBIF"){
        cuota.desgravamen = Math.round(cuota.saldoFinal * (0.111/100));
      }else if(this.banco2 == "HUANCAYO"){
        cuota.desgravamen = Math.round(cuota.saldoFinal * (0.0800/100));
      }else if(this.banco2 == "CUSCO"){
        cuota.desgravamen = Math.round(cuota.saldoFinal * (0.0600/100));
      }else if(this.banco2 == "AREQUIPA"){
        cuota.desgravamen = Math.round(cuota.saldoFinal * (0.05/100));
      }else if(this.banco2 == "EFECTIVA"){
        cuota.desgravamen = Math.round(cuota.saldoFinal * (0.035/100));
      }else if(this.banco2  == "CREDISCOTIA"){
        cuota.desgravamen = Math.round(cuota.saldoFinal * (0.0320/100));
      }else if(this.banco2 == "MICASITA"){
        cuota.desgravamen = Math.round(cuota.saldoFinal * (0.0670/100));
      }


      // console.log(this.datos.at(1));

      // this.valorCuota = cuota.amortizacion + cuota.interes
      this.valorCuota = cuota.cuota;
      this.valorCuotaIndex = (this.valorCuota)/Math.pow(1 + (this.interesMensual/100), cuotaIndex);
      console.log(`VALOR CUOTA INDEX ${this.valorCuotaIndex}`);
      this.sumaDeValoresCuotaIndex += this.valorCuotaIndex
      console.log(`SUMA DE VALORES INDEX: ${this.sumaDeValoresCuotaIndex}`);


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



//TODO prueba


      // if(cuotaIndex == 1){
      //   cuota.plazoGracia ='T';
      //   cuota.cuota = 0;
      //   cuota.amortizacion = 0;
      //   cuota.saldoFinal= cuota.saldoInicial + cuota.interes;
      // }
      // else{
      //   cuota.plazoGracia = 'S';
      // }

      cuota.plazoGracia = 'S';
      // if(cuotaIndex==2 || cuotaIndex == 3){
      //   this.plazoGracia ='P';
      // }


//TODO prueba


      // if (this.plazoGracia == 'T'){
      //   cuota.cuota = 0;
      //   cuota.amortizacion=0;
      //
      // }
      // else if(this.plazoGracia == 'P'){
      //   cuota.amortizacion = 0;
      //   cuota.cuota = cuota.interes;
      //   if (cuota.saldoInicial != null) {
      //     cuota.saldoFinal = cuota.saldoInicial;
      //   }
      // }
      // else{
      //   this.plazoGracia ='S';
      // }
      //
      //
      // const myList: Cuota[] = [
      //   this.loginService.getReportByIdFromUser(Number(sessionStorage.getItem("user")))
      // ];
      //cuota.cronograma = myList.at(myList.length -1).cronograma + 1;

      // this.loginService.getReportByIdFromUser(Number(sessionStorage.getItem("user"))).subscribe((response: any) => {
      //   this.reports = response.content;
      // });

      // if(cuotaIndex == this.plazo){
      //   cuota.cronograma = 1;
      //   // cuota.cronograma = this.reports.at(this.reports.length - 1)!.cronograma! + 1;
      //   console.log(`CRONOGRAMA + ${cuota.cronograma}`);
      // }

      this.cuotas.push(cuota);
      cuota.saldoFinal = cuota.saldoFinal - cuota.amortizacion;
      // this.loginService.createReportByUserId(cuota, Number(sessionStorage.getItem("user"))).subscribe(response =>{})


      // this.desgravamen = 0.2;

      // this.reportData.amortizacion = this.totalAmortizacion;
      // this.reportData.interes = this.interesMensual;
      // this.reportData.saldo = this.saldo;
      // this.reportData.cuota = this.cuotaMensual;
      // this.reportData.desgravamen = this.desgravamen;

      // @ts-ignore






      this.jsonData.push(cuota);

      this.reportDataFinal.id = cuotaIndex;
      this.reportDataFinal.numeroCuota = cuotaIndex;
      this.reportDataFinal.amortizacion =  cuota.amortizacion;
      this.reportDataFinal.interes = cuota.interes;
      // @ts-ignore
      this.reportDataFinal.desgravamen =  cuota.desgravamen;
      this.reportDataFinal.cuota = cuota.cuota;
      this.reportDataFinal.saldoInicial = cuota.saldoInicial;
      this.reportDataFinal.saldoFinal = cuota.saldoFinal;

      this.loginService.createReportByUserId(cuota, Number(sessionStorage.getItem("user"))).subscribe(response =>{})

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
    // this.addCuota()
  }

  calculateVAN(){

    console.log(`SUMA DE VALORES INDEX: ${this.sumaDeValoresCuotaIndex}`);
    console.log(`CUOTA MENSUAL: ${this.capital2}`);
    this.resultadoVAN = this.sumaDeValoresCuotaIndex - this.capital2;
    if(this.resultadoVAN < 0){
      console.log(`EL PROYECTO NO ES RENTABLE, VALOR DEL VAN ${this.resultadoVAN}`);
    }else{
      console.log(`EL PROYECTO ES RENTABLE, VALOR DEL VAN ${this.resultadoVAN}`);
    }
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

  // parseSeparadorMiles(valor: any) {
  //   if (Number(valor).toString() == 'NaN') {
  //     console.log('El valor ingresado no es un número.');
  //     this.capital = '';
  //   }
  //
  //   valor = valor.toString().replaceAll('.', '');
  //   this.capital = Number(valor).toLocaleString('es-AR');
  // }

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
    if (this.plazo <0) {
      this.openSnackBar('Plazo no válida !');
      return true;
    }
    if (this.cuotaInicial <0) {
      this.openSnackBar('Cuota Inicial no válida !');
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
  // addReport() {
  //   this.reportData.id = 0;
  //   this.reportsService.create(this.reportData).subscribe((response: any) => {
  //     this.dataSource.data.push({...response});
  //     this.dataSource.data = this.dataSource.data.map((o: any) => { return o});
  //   });
  // }

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


  // getAllReports() {
  //   this.reportsService.getAll().subscribe((response: any) => {
  //     this.dataSource.data = response;
  //   });
  // }



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
