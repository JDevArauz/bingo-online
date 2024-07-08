import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  login() {
    if (this.loginForm.valid) {
      const usuario = this.loginForm.get('email')?.value;
      const contraseña = this.loginForm.get('password')?.value;
      const url = 'http://localhost:3000/api/session/login';
      const body = {
        user: usuario,
        pass: contraseña
      };

      this.http.post(url, body).subscribe((res: any) => {
        if (res.status === 200) {
          console.log('Login correcto');;
        } else {
          console.log('Login incorrecto');
        }
      }, (error) => {
        console.error('Error en la petición:', error);
      });
    } else {
      console.log('Formulario no válido');
    }
  }
}