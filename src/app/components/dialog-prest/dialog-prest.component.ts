import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dialog-prest',
  templateUrl: './dialog-prest.component.html',
  styleUrls: ['./dialog-prest.component.scss']
})
export class DialogPrestComponent implements OnInit {

  backendHost = "http://localhost:3050/";

  data_book: Libros[];
  dataSourceBook: Libros[];
  columnsToDisplayBook = ['name'];
  expandedElementBook: Libros | null;
  books: Libros[];
  selectedValue: string;

  prestForm: FormGroup;

  constructor(public fb: FormBuilder, private httpClient: HttpClient, private toastSvc: ToastrService, public dialog: MatDialog, public router: Router) {
    this.prestForm = this.fb.group({
      fecha_ent: ['', Validators.required],
      fecha_dev: ['', [Validators.required]],
      id_libro: [''],
      id_user: sessionStorage.getItem('CurrentId'),
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
    this.httpClient.get<Libros[]>(`${this.backendHost}books`)
      .subscribe(res => {
        if (res) {
          this.dataSourceBook = res;
          this.books = res
        } else {
          this.toastSvc.warning(`Debes iniciar sesión primeramente`, 'SM Digital');
        }
      });
      
  }

  get fechaEntField(): AbstractControl {
    return this.prestForm.get('fecha_ent') as AbstractControl;
  }
  get fechaDevField(): AbstractControl {
    return this.prestForm.get('fecha_dev') as AbstractControl;
  }

  functioncall() {
    this.prestForm.controls['id_libro'].setValue(this.selectedValue)
    console.log(this.prestForm.value)
    this.httpClient.post(`${this.backendHost}addPrest`, this.prestForm.value)
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

export interface Libros {
  id_libro: number,
  author: string,
  name: string,
  id_user: number
}