import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  currentEmail = "";
  currentPassword = "";
  loginSubmit = "";


  form: FormGroup;

  serverResponse: any

  constructor() {  // formGroup y FormControl viene de Angular Forms 
    this.form = new FormGroup({
      'email': new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]),
      'password': new FormControl('', [Validators.required, Validators.pattern("(?=.[a-z])(?=.[A-Z])(?=.[0-9])(?=.[$@$!%?&])[A-Za-z\d$@$!%?&].{8,}")])
    })
  }


  ngOnInit(): void {
  }

  validateForm() {

    let errors = false  // comienza sin errores 

    if (this.form.controls['email'].errors?.['pattern']) {
      this.loginSubmit = "El formato del correo es incorrecto "  // Si no cumple con el required del email o con los patrones (no existe ) entonces no existe  y hay error 
      errors = true
    }
    else {
      this.currentEmail = this.form.controls['email'].value  // en dado caso que no cumpla el if, sigue corriendo 
    }

    if (this.form.controls['password'].errors?.['pattern'] || this.form.controls['password'].errors?.['minLength']) {
      this.loginSubmit = "La contraseña es incorrecta"
      errors = true  // Si no cumple con el required del password o con los patrones (no existe ) entonces no existe  y hay error 
    } else {
      this.currentPassword = this.form.controls['password'].value
    }


    if (!errors) {
      // this.getData() // para obtener datos del servidor 
    }

  }
}
