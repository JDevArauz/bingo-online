import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  userIsAuthenticated = false;
  events = [
    {
      id: 1,
      stateId: '1',
      stateName: 'Activo',
      description: 'Evento 1',
      location: 'Lugar 1',
      eventType: 'Presencial',
      startDate: '2024-08-15',
      startHour: '10:00 AM',
    },
    {
      id: 2,
      stateId: '2',
      stateName: 'Pendiente',
      description: 'Evento 2',
      location: 'Lugar 2',
      eventType: 'Online',
      startDate: '2024-08-20',
      startHour: '2:00 PM',
    },
    // Más eventos...
  ];

  navigateToEvent(eventId: any) {
    console.log('Evento:', eventId);
  }
  getStateClass(stateId: string): string {
    switch (stateId) {
      case '1':
        return 'bg-green-200 text-green-600 hover:bg-green-100';
      case '2':
        return 'bg-yellow-200 text-yellow-600 hover:bg-yellow-100';
      default:
        return 'bg-red-200 text-red-600 hover:bg-red-100';
    }
  }

}
