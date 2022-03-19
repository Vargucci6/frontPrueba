import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/components/dialog/dialog.component';
import { InicioComponent } from '../inicio/inicio.component';
import { RegisterBookComponent } from 'src/app/components/register-book/register-book.component';
import { DialogEditBookComponent } from 'src/app/components/dialog-edit-book/dialog-edit-book.component';
import { DialogPrestComponent } from 'src/app/components/dialog-prest/dialog-prest.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class HomeComponent implements OnInit {

  data_user: Usuarios[];
  data_book: Libros[];
  data_prest: Prestamos[];
  backendHost = "http://localhost:3050/";

  dataSourceUser: Usuarios[];
  dataSourceBook: Libros[];
  dataSourcePrest: Prestamos[];
  columnsToDisplayUser = ['email'];
  columnsToDisplayBook = ['name'];
  columnsToDisplayPrest = ['id_libro'];
  expandedElementUser: Usuarios | null;
  expandedElementBook: Libros | null;
  expandedElementPrest: Prestamos | null;

  @Input() id_user: string;
  @Input() name: string;
  @Input() email: string;
  @Input() password: string;
  @Input() id_libro: string;
  @Input() nameBook: string;
  @Input() author: string;

  constructor(private httpClient: HttpClient, private toastSvc: ToastrService, private router: Router, public dialog: MatDialog) { }

  ngOnInit(): void {



    let httpHeaders: HttpHeaders = new HttpHeaders();
    const token = sessionStorage.getItem('token');
    console.log('get token', token);
    httpHeaders = httpHeaders.append('Authorization', 'Bearer ' + token);

    this.httpClient.post(`${this.backendHost}post`, {}, { headers: httpHeaders })
      .subscribe(res => {
        if (res) {
        } else {
          this.router.navigate(['/login']);
          this.toastSvc.warning(`Debes iniciar sesión primeramente`, 'SM Digital');
        }
      });


    this.httpClient.get<Usuarios[]>(`${this.backendHost}customers`)
      .subscribe(res => {
        if (res) {
          this.dataSourceUser = res;
          console.log(this.data_user)
        } else {
          this.toastSvc.warning(`Debes iniciar sesión primeramente`, 'SM Digital');
        }
      });
    this.httpClient.get<Libros[]>(`${this.backendHost}books`)
      .subscribe(res => {
        if (res) {
          this.dataSourceBook = res;
        } else {
          this.toastSvc.warning(`Debes iniciar sesión primeramente`, 'SM Digital');
        }
      });
    this.httpClient.get<Prestamos[]>(`${this.backendHost}prestamos`)
      .subscribe(res => {
        if (res) {
          this.dataSourcePrest = res;
        }
      });
  }
  signOut() {
    this.router.navigate(['/login']);
    sessionStorage.setItem('token', "");
    this.toastSvc.success(`Sesió cerrada correctamente`, 'SM Digital');
  }
  openDialogBook() {
    const dialogRef = this.dialog.open(RegisterBookComponent);
  }
  openDialogPrest() {
    const dialogRef = this.dialog.open(DialogPrestComponent);
  }
  openDialog(id: number) {
    this.httpClient.get<Usuarios[]>(`${this.backendHost}customers/${id}`)
      .subscribe(res => {
        if (res) {
          this.data_user = res
          this.data_user.forEach(element => {
            this.id_user = element.id_user as unknown as string;
            this.name = element.username;
            this.email = element.email;
            this.password = element.password;
            sessionStorage.setItem('id_user', this.id_user);
            sessionStorage.setItem('name', this.name);
            sessionStorage.setItem('email', this.email);
            sessionStorage.setItem('password', this.password);
            const dialogRef = this.dialog.open(DialogComponent);
            dialogRef.afterClosed().subscribe(result => {
              sessionStorage.setItem('id_user', "");
              sessionStorage.setItem('name', "");
              sessionStorage.setItem('email', "");
              sessionStorage.setItem('password', "");
              this.httpClient.get<Usuarios[]>(`${this.backendHost}customers`)
                .subscribe(res => {
                  if (res) {
                    this.dataSourceUser = res;
                    console.log(this.data_user)
                  } else {
                    this.toastSvc.warning(`Debes iniciar sesión primeramente`, 'SM Digital');
                  }
                });
            });
          });
        } else {
          this.toastSvc.error(`Error`, 'SM Digital');
        }
      })
    console.log(`${this.name} ${this.email} ${this.password}`)
    return id;
  }
  openDialogEditBook(id: number) {
    this.httpClient.get<Libros[]>(`${this.backendHost}books/${id}`)
      .subscribe(res => {
        if (res) {
          this.data_book = res
          this.data_book.forEach(element => {
            this.id_libro = element.id_libro as unknown as string;
            this.nameBook = element.name;
            this.author = element.author;
            sessionStorage.setItem('id_libro', this.id_libro);
            sessionStorage.setItem('nameBook', this.nameBook);
            sessionStorage.setItem('author', this.author);
            const dialogRef = this.dialog.open(DialogEditBookComponent);
            dialogRef.afterClosed().subscribe(result => {
              sessionStorage.setItem('id_libro', "");
              sessionStorage.setItem('nameBook', "");
              sessionStorage.setItem('author', "");
              this.httpClient.get<Libros[]>(`${this.backendHost}books`)
                .subscribe(res => {
                  if (res) {
                    this.dataSourceBook = res;
                    console.log(this.data_book)
                  } else {
                    this.toastSvc.warning(`Debes iniciar sesión primeramente`, 'SM Digital');
                  }
                });
            });
          });
        } else {
          this.toastSvc.error(`Error`, 'SM Digital');
        }
      })
    console.log(`${this.name} ${this.email} ${this.password}`)
    return id;
  }

}

export interface Usuarios {
  id_user: number,
  username: string,
  email: string,
  password: string
}

export interface Libros {
  id_libro: number,
  author: string,
  name: string,
  id_user: number
}
export interface Prestamos {
  id_prestamo: number,
  fecha_ent: string,
  fecha_dev: string,
  id_libro: number,
  id_user: number
}