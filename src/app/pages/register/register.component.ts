import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

  currentFName = "";
  currentLName = "";
  currentBday = "";
  currentEmail = "";
  currentPassword = "";


  form: FormGroup;
  firstNameSubmit!: String;
  lastNameSubmit!: String;
  emailSubmit!: String;
  passwordSubmit!: String;
  birthdaySubmit!: String;
  confirmPasswordSubmit!: String;
  date !: Date
  minDate !: Date

  serverResponse: any


  constructor() {
    this.form = new FormGroup({
      'firstName': new FormControl('', [Validators.required, Validators.minLength(1)]),
      'lastName': new FormControl('', [Validators.required, Validators.minLength(1)]),
      'birthday': new FormControl('', Validators.required),
      'email': new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      'password': new FormControl('', [Validators.required, Validators.pattern("(?=.[a-z])(?=.[A-Z])(?=.[0-9])(?=.[$@$!%?&])[A-Za-z\d$@$!%?&].{8,}")]),
      'confirmPassword': new FormControl('', [Validators.required, Validators.pattern("(?=.[a-z])(?=.[A-Z])(?=.[0-9])(?=.[$@$!%?&])[A-Za-z\d$@$!%?&].{8,}")]),
    })
  }

  ngOnInit(): void {
    this.date = new Date()
    this.minDate = new Date('1900-01-01')
  }

  validateForm() {
    console.log("SHOULD BE VALIDATING FORM")

    let errors = true;
    // this.lastNameSubmit = ''
    // this.emailSubmit = ''
    // this.passwordSubmit = ''
    // this.confirmPasswordSubmit = ''
    // this.birthdaySubmit = ''

    // if (this.form.controls['email'].errors?.['required'] || this.form.controls['email'].errors?.['pattern']) {
    //   this.emailSubmit = 'Please provide a valid email address!'
    //   errors = true
    // } else {
    //   this.currentEmail = this.form.controls['email'].value
    // }
    // if (this.form.controls['firstName'].errors?.['required'] || this.form.controls['firstName'].errors?.['minLength']) {
    //   this.firstNameSubmit = 'Please provide a valid name!'
    //   errors = true
    // } else {
    //   this.currentFName = this.form.controls['firstName'].value
    // }
    // if (this.form.controls['lastName'].errors?.['required'] || this.form.controls['lastName'].errors?.['minLength']) {
    //   this.lastNameSubmit = 'Please provide a valid last name!'
    //   errors = true
    // } else {
    //   this.currentLName = this.form.controls['lastName'].value
    // }
    // if (this.form.controls['password'].errors?.['required'] || this.form.controls['password'].errors?.['pattern']) {
    //   this.passwordSubmit = 'Password must be at least 8 characters, also contain an uppercase, a number, a lower case and a special character ($ @ $ ! % * ? or &)'
    //   errors = true
    // } else {
    //   this.currentPassword = this.form.controls['password'].value
    // }
    // if (this.form.controls['confirmPasswordSubmit'].value !== this.form.controls['password'].value) {
    //   this.confirmPasswordSubmit = 'Tus contraseñas no coinciden'
    //   errors = true
    // } else { this.currentPassword = this.form.controls['confirmPasswordSubmit'].value }

    // if (this.form.controls['birthday'].errors?.['required']) {
    //   this.birthdaySubmit = 'A birthday is neccesary!'
    //   errors = true
    // } else {
    //   this.currentBday = this.form.controls['birthday'].value
    // }

    // if (!errors) {
    //   this.getData()
    // } else {
    //   this.form.markAsPristine();
    //   this.form.markAsUntouched();
    // }

  }

  getData() {
    //console.log(this.currentFName + "\n" + this.currentLName + "\n" + this.currentBday + "\n" + this.currentEmail + "\n" + this.currentPassword);

    let signUpData = {
      'email': this.currentEmail,
      'password': this.currentPassword,
      'name': this.currentFName,
      'last_name': this.currentLName,
      'birthdate': this.currentBday
    }


  }

}