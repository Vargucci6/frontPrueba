import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {


  editForm: FormGroup;
  backendHost = "http://localhost:3050/";
  id_user = "";
  response = false;

  constructor(public fb: FormBuilder, private httpClient: HttpClient, private toastSvc: ToastrService, private router: Router) {
  }

  get nameField(): AbstractControl {
    return this.editForm.get('name') as AbstractControl;
  }
  get emailField(): AbstractControl {
    return this.editForm.get('email') as AbstractControl;
  }

  get passwordField(): AbstractControl {
    return this.editForm.get('password') as AbstractControl;
  }



  ngOnInit(): void {
    this.id_user = sessionStorage.getItem('id_user') as string;
    let name = sessionStorage.getItem('name') as string;
    let email = sessionStorage.getItem('email') as string;
    let password = sessionStorage.getItem('password') as string;
    this.editForm = this.fb.group({
      name: [`${name}`, Validators.required],
      email: [`${email}`, [Validators.required, Validators.email]],
      password: [`${password}`, [Validators.required, Validators.minLength(8)]]
    });
  }

  functioncall() {
    this.httpClient.put(`${this.backendHost}update/${this.id_user}`, this.editForm.value)
      .subscribe(res => {
        if (res) {
          this.toastSvc.success(`Usuario actualizado correctamente`, 'SM Digit');
        } else {
          this.toastSvc.error(`Correo electrónico ya usado`, 'SM Digit');
        }
      });
  }
  delete() {
    this.httpClient.delete(`${this.backendHost}delete/${this.id_user}`)
      .subscribe(res => {
        if (res) {
          this.toastSvc.success(`Usuario eliminado correctamente`, 'SM Digit');
        } else {
          this.toastSvc.error(`Error al eliminar usuario`, 'SM Digit');
        }
      });
  }

}
