import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dialog-edit-prest',
  templateUrl: './dialog-edit-prest.component.html',
  styleUrls: ['./dialog-edit-prest.component.scss']
})
export class DialogEditPrestComponent implements OnInit {


  data_book: Libros[];
  dataSourceBook: Libros[];
  columnsToDisplayBook = ['name'];
  expandedElementBook: Libros | null;
  editForm: FormGroup;
  backendHost = "http://localhost:3050/";
  id_prestamo = "";
  response = false;
  books: Libros[];
  selectedValue: string;

  constructor(public fb: FormBuilder, private httpClient: HttpClient, private toastSvc: ToastrService, private router: Router, private dialog: MatDialog) {
  }

  get fechaEntField(): AbstractControl {
    return this.editForm.get('fecha_ent') as AbstractControl;
  }
  get fechaDevField(): AbstractControl {
    return this.editForm.get('fecha_dev') as AbstractControl;
  }



  ngOnInit(): void {
    this.id_prestamo = sessionStorage.getItem('id_prestamo') as string;
    let fecha_ent = sessionStorage.getItem('fechaEnt') as string;
    let fecha_dev = sessionStorage.getItem('FechaDev') as string;
    let id_libro = sessionStorage.getItem('id_libro') as string;
    this.editForm = this.fb.group({
      fecha_ent: [`${fecha_ent}`, Validators.required],
      fecha_dev: [`${fecha_dev}`, Validators.required],
      id_libro: [`${id_libro}`, Validators.required],
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

  functioncall() {
    this.httpClient.put(`${this.backendHost}updatePrest/${this.id_prestamo}`, this.editForm.value)
      .subscribe(res => {
        if (res) {
          this.toastSvc.success(`Prestamo actualizado correctamente`, 'SM Digit');
          this.dialog.closeAll();
        } else {
          this.toastSvc.error(`Error`, 'SM Digit');
        }
      });
  }
  delete() {
    this.httpClient.delete(`${this.backendHost}deletePrest/${this.id_prestamo}`)
      .subscribe(res => {
        if (res) {
          this.toastSvc.success(`Usuario eliminado correctamente`, 'SM Digit');
        } else {
          this.toastSvc.error(`Error al eliminar usuario`, 'SM Digit');
        }
      });
  }

}
export interface Libros {
  id_libro: number,
  author: string,
  name: string,
  id_user: number
}