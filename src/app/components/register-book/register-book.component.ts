import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register-book',
  templateUrl: './register-book.component.html',
  styleUrls: ['./register-book.component.scss']
})
export class RegisterBookComponent implements OnInit {

  usuario: any = {
    name: "",
    email: "",
    password: ""
  };

  backendHost = "http://localhost:3050/";

  bookForm: FormGroup;

  constructor(public fb: FormBuilder, private httpClient: HttpClient, private toastSvc: ToastrService, public dialog: MatDialog, public router: Router) {
    this.bookForm = this.fb.group({
      name: ['', Validators.required],
      author: ['', [Validators.required]],
      id_user: sessionStorage.getItem('CurrentId')
    });
  }
  ngOnInit(): void {
    let httpHeaders: HttpHeaders = new HttpHeaders();
    const token = sessionStorage.getItem('token');
    console.log('get token', token);
    httpHeaders = httpHeaders.append('Authorization', 'Bearer ' + token);

    this.httpClient.post<usuario>(`${this.backendHost}post`, {}, { headers: httpHeaders })
      .subscribe(res => {
        if (res) {
          let id_user = res.user[0].id_user;
          sessionStorage.setItem('CurrentId', id_user as unknown as string);
        } else {
          this.router.navigate(['/login']);
          this.toastSvc.warning(`Debes iniciar sesión primeramente`, 'SM Digital');
        }
      });
  }

  get nameField(): AbstractControl {
    return this.bookForm.get('name') as AbstractControl;
  }
  get authorField(): AbstractControl {
    return this.bookForm.get('author') as AbstractControl;
  }

  functioncall() {

    this.httpClient.post(`${this.backendHost}addBook`, this.bookForm.value)
      .subscribe(res => {
        if (res) {
          this.dialog.closeAll();
          this.toastSvc.success(`Libro añadido correctamente`, 'SM Digital');
        } else {
          this.toastSvc.error(`Campos vacíos`, 'SM Digital');
        }
      });

    //console.log(this.signUpForm.value)
  }

}
export interface usuario {
  user: [
    {
      username: String,
      id_user: Number,
      email: String,
      password: String
    }
  ]
}
