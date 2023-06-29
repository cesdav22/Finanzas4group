import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataSharingServiceService {

  private data!: any[];
  private VAN: number = 0;
  private TIR: number = 0;
  setData(data: any[]) {
    this.data = data;
  }
  setVAN(VAN: number) {
    this.VAN = VAN;
  }
  getVAN() {
    return this.VAN;
  }

  getData(): any[] {
    return this.data;
  }


  setTIR(TIR: number) {
    this.TIR = TIR;
  }

  getTIR():number{
    return this.TIR;
  }

}
