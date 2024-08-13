import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient, private navCtrl: NavController, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  navigateToForgotPassword() {
    this.navCtrl.navigateForward('/forgot-password');
  }

  navigateToRegister() {
    this.navCtrl.navigateForward('/register');
  }

  validateLogin() {
    if (this.loginForm.valid) {
      const usuario = this.loginForm.get('email')?.value;
      const contraseña = this.loginForm.get('password')?.value;
      const url = 'http://localhost:3000/api/session/login';
      const body = {
        user: usuario,
        pass: contraseña
      };
      this.http.post(url, body, { observe: 'response' }).subscribe(
        (response: HttpResponse<any>) => {
          if (response.status === 200) {
            console.log('Login correcto');
            console.log('Usuario:', response.body);
            // REDIRECCIONAR A LA PÁGINA DE INICIO DE USUARIOS O DE ADMINISTRADORES, DEPENDE DEL ROL
            this.router.navigate(['/home']);
          } else {
            console.log('Login incorrecto');
          }
        },
        (error) => {
          console.error('Error en la petición:', error);
        }
      );
    } else {
      console.log('Formulario no válido');
    }
  }
}
