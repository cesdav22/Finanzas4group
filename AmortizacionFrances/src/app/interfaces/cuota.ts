export interface Cuota {
    id?:number;
    userId?:number;
    numeroCuota?: number;
    amortizacion?: number;
    interes?: number;
    desgravamen?: number;
    cuota?: number;
    saldoInicial: number;
    saldoFinal: number;

    plazoGracia:string;
}
