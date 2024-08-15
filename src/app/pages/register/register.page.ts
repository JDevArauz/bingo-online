import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private navCtrl: NavController,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      email: ['', Validators.required],
      name: ['', Validators.required],
      dni_id: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit() {}

  validateRegister() {
    if(this.registerForm.valid) {
      const email = this.registerForm.get('email')?.value;
      const name = this.registerForm.get('name')?.value;
      const dni_id = this.registerForm.get('dni_id')?.value;
      const password = this.registerForm.get('password')?.value;
      const url = 'http://localhost:3000/api/users';
      const body = {
        email: email,
        name: name,
        dni_id: dni_id,
        password: password
      };
      this.http.post(url, body, { observe: 'response' }).subscribe(
        (response: HttpResponse<any>) => {
          if (response.status === 201) {
            console.log('Registro correcto');
            console.log('Usuario:', response.body);
            this.router.navigate(['/login']); // Volver al Login para la autenticacion del usuario
          } else {
            console.log('Registro incorrecto');
          }
        },
        (error) => {
          console.error('Error en la petición:', error);
        }
      );
    }else{
      console.log(this.registerForm);
      console.log('Formulario no válido');
    }
  }
}
