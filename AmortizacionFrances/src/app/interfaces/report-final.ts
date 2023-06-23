export interface ReportFinal {
    id: number;
    userId?:number;
    numeroCuota?: number;
    amortizacion: number,
    interes: number;
    desgravamen: number;
    cuota: number;
    saldoInicial: number;
    saldoFinal: number;
    plazoGracia:string;
    cronograma: number;

}
