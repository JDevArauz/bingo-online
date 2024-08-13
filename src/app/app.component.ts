import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private http: HttpClient
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.platform.pause.subscribe({
        next: () => {
          this.logout();
          console.log('Aplicación en pausa');
        },
        error: (err) => {
          console.error('Error en la suscripción a pause:', err);
        }
      });
      });
  }

  logout() {
    this.http.post(`${'http://localhost:3000/api/session/logout'}`, {}).subscribe(response => {
      console.log('Sesión cerrada:', response);
    }, error => {
      console.error('Error cerrando sesión:', error);
    });
  }

}
