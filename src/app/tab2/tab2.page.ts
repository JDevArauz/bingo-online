import { Component } from '@angular/core';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  // Datos simulados para la vista
  numerosLlamados: number[] = [12, 34, 56, 78, 90,12, 34, 56, 78, 90,12, 34, 56, 78, 90,12, 34, 56, 78, 90];
  carton: number[][] = [
    [1, 2, 3, 4, 5],
    [6, 7, 8, 9, 10],
    [11, 12, 13, 18, 15],
    [16, 17, 18, 19, 20],
    [21, 22, 23, 24, 25]
  ];

  constructor() {}
}
