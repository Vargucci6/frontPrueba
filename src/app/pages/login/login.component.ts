import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

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
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  backendHost = "http://localhost:3050/";
  statusRegster = false;

  signInForm: FormGroup;

  constructor(public fb: FormBuilder, private httpClient: HttpClient, private toastSvc: ToastrService, private router: Router) {
    this.signInForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  ngOnInit(): void {



    let httpHeaders: HttpHeaders = new HttpHeaders();
    const token = sessionStorage.getItem('token');
    console.log('get token', token);
    httpHeaders = httpHeaders.append('Authorization', 'Bearer ' + token);

    this.httpClient.post(`${this.backendHost}post`, {}, { headers: httpHeaders })
      .subscribe(res => {
        if (res) {
          this.router.navigate(['/home']);
          this.toastSvc.warning(`Ya iniciaste sesión`, 'SM Digital');
        }
      });
  }

  get emailField(): AbstractControl {
    return this.signInForm.get('email') as AbstractControl;
  }

  get passwordField(): AbstractControl {
    return this.signInForm.get('password') as AbstractControl;
  }

  matcher = new MyErrorStateMatcher();


  loginIn() {
    this.httpClient.post(`${this.backendHost}login`, this.signInForm.value)
      .subscribe(res => {
        if (res) {
          this.toastSvc.success(`Iniciando sesión de manera correcta`, 'SM Digital');
          console.log('token: ', res)
          const token = res as string;
          sessionStorage.setItem('token', token);
          this.router.navigate(['/home']);
        } else {
          this.toastSvc.error(`Correo y/o contraseña incorrecta`, 'SM Digital');
        }
      })

  }
  goToRegister() {
    this.router.navigate(['']);
  }
}
