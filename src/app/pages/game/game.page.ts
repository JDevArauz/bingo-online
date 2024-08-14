import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-game',
  templateUrl: './game.page.html',
  styleUrls: ['./game.page.scss'],
})
export class GamePage implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  numerosLlamados = [12, 34, 56, 78, 90, 11, 22, 33];  // Ejemplo de números llamados
  numerosSeleccionados: number[] = [];
  carton = [
    [5, 18, 42, 60, 75],
    [10, 20, 35, 55, 65],
    [3, 24, 0, 52, 68],  // El 0 es el espacio "Libre"
    [1, 23, 44, 53, 70],
    [7, 19, 39, 57, 72],
  ];

  getColorClass(index: number): string {
    return index % 2 === 0 ? 'text-red-700' : 'text-red-700';
  }

  selectNumber(numero: number) {
    if (!this.numerosSeleccionados.includes(numero)) {
      this.numerosSeleccionados.push(numero);
      console.log('Número seleccionado:', numero);
    }else{
      console.log('Número ya seleccionado:', numero);
      //REMOVER EL NUMERO DE LA LISTA Y VOLVER AL COLOR NORMAL EL a
      this.numerosSeleccionados = this.numerosSeleccionados.filter((num) => num !== numero);

    }
  }

}
