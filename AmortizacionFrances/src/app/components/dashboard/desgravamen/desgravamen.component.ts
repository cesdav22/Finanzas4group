import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-desgravamen',
  templateUrl: './desgravamen.component.html',
  styleUrls: ['./desgravamen.component.css']
})
export class DesgravamenComponent implements OnInit {

  constructor(private router: Router) {}


  ngOnInit(): void {
    setTimeout(() => {
      this.router.navigate(['/amortizacion']); // Navega a la página de inicio
    }, 5000); // 5000 milisegundos = 5 segundos
  }


}
