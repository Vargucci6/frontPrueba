import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, AbstractControl, FormGroupDirective, NgForm } from '@angular/forms';
import { HttpClient } from "@angular/common/http";
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ErrorStateMatcher } from '@angular/material/core';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent {

  usuario: any = {
    name: "",
    email: "",
    password: ""
  };

  backendHost = "http://localhost:3050/";

  signUpForm: FormGroup;

  constructor(public fb: FormBuilder, private httpClient: HttpClient, private toastSvc: ToastrService, private router: Router) {
    this.signUpForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email], /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  get nameField(): AbstractControl {
    return this.signUpForm.get('name') as AbstractControl;
  }
  get emailField(): AbstractControl {
    return this.signUpForm.get('email') as AbstractControl;
  }

  get passwordField(): AbstractControl {
    return this.signUpForm.get('password') as AbstractControl;
  }

  matcher = new MyErrorStateMatcher();


  functioncall() {

    this.httpClient.post(`${this.backendHost}add`, this.signUpForm.value)
      .subscribe(res => {
        if (res == true) {
          this.toastSvc.success(`Usuario guardado corractamente, puedes iniciar sesión`, 'SM Digital');
        } else if (res == false) {
          this.toastSvc.error(`Correo electrónico ya usado, intenta con otro`, 'SM Digital');
        } else {
          this.toastSvc.warning(`Usuario no guardado, revisa los campos subyados.`, 'SM Digital');
        }
      });

    //console.log(this.signUpForm.value)
  }

}
