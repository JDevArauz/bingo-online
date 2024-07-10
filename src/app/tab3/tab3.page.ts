import { Component } from '@angular/core';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  events = [
    {
      stateId: '1',
      stateName: 'Activo',
      description: 'Evento de ejemplo',
      location: 'Ubicación de ejemplo',
      eventType: 'Tipo de evento',
      startDate: '2024-07-09',
      startHour: '10:00 AM',
      id: 1
    },
    {
      stateId: '1',
      stateName: 'Activo',
      description: 'Evento de ejemplo',
      location: 'Ubicación de ejemplo',
      eventType: 'Tipo de evento',
      startDate: '2024-07-09',
      startHour: '10:00 AM',
      id: 1
    },
    {
      stateId: '1',
      stateName: 'Activo',
      description: 'Evento de ejemplo',
      location: 'Ubicación de ejemplo',
      eventType: 'Tipo de evento',
      startDate: '2024-07-09',
      startHour: '10:00 AM',
      id: 1
    },
    {
      stateId: '2',
      stateName: 'En Juego',
      description: 'Eventoasdfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff de ejemplo',
      location: 'Ubicaciónddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd de ejemplo',
      eventType: 'Tipo dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddde evento',
      startDate: '2024-07-09',
      startHour: '10:00 AM',
      id: 1
    },
    {
      stateId: '3',
      stateName: 'Terminado',
      description: 'Evento de ejemplo',
      location: 'Ubicación de ejemplo',
      eventType: 'Tipo de evento',
      startDate: '2024-07-09',
      startHour: '10:00 AM',
      id: 1
    },
    // Agrega más eventos aquí
  ];

  constructor() {}

}
