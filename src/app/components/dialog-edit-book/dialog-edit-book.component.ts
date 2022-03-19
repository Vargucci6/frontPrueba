import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dialog-edit-book',
  templateUrl: './dialog-edit-book.component.html',
  styleUrls: ['./dialog-edit-book.component.scss']
})
export class DialogEditBookComponent implements OnInit {

  editForm: FormGroup;
  backendHost = "http://localhost:3050/";
  id_libro = "";
  response = false;

  constructor(public fb: FormBuilder, private httpClient: HttpClient, private toastSvc: ToastrService, private router: Router, private dialog: MatDialog) {
  }

  get nameField(): AbstractControl {
    return this.editForm.get('name') as AbstractControl;
  }
  get authorField(): AbstractControl {
    return this.editForm.get('author') as AbstractControl;
  }



  ngOnInit(): void {
    this.id_libro = sessionStorage.getItem('id_libro') as string;
    let name = sessionStorage.getItem('nameBook') as string;
    let author = sessionStorage.getItem('author') as string;
    this.editForm = this.fb.group({
      name: [`${name}`, Validators.required],
      author: [`${author}`, Validators.required]
    });
  }

  functioncall() {
    this.httpClient.put(`${this.backendHost}updateBook/${this.id_libro}`, this.editForm.value)
      .subscribe(res => {
        if (res) {
          this.toastSvc.success(`Usuario actualizado correctamente`, 'SM Digit');
          this.dialog.closeAll();
        } else {
          this.toastSvc.error(`Correo electrónico ya usado`, 'SM Digit');
        }
      });
  }
  delete() {
    this.httpClient.delete(`${this.backendHost}deleteBook/${this.id_libro}`)
      .subscribe(res => {
        if (res) {
          this.toastSvc.success(`Usuario eliminado correctamente`, 'SM Digit');
        } else {
          this.toastSvc.error(`Error al eliminar usuario`, 'SM Digit');
        }
      });
  }
}
