import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { Error404Component } from './pages/error404/error404.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { InputPassComponent } from './components/input-pass/input-pass.component';
import { ToastrModule } from 'ngx-toastr';
import { ButtonComponent } from './components/button/button.component';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from "@angular/common/http";
import { InputComponent } from './components/input/input.component';
import { LoginComponent } from './pages/login/login.component';
import { CookieService } from 'ngx-cookie-service';
import { HomeComponent } from './pages/home/home.component';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogComponent } from './components/dialog/dialog.component';
import { RegisterBookComponent } from './components/register-book/register-book.component';
import { DialogEditBookComponent } from './components/dialog-edit-book/dialog-edit-book.component';
import { DialogEditPrestComponent } from './components/dialog-edit-prest/dialog-edit-prest.component';
import { DialogPrestComponent } from './components/dialog-prest/dialog-prest.component';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    Error404Component,
    InputPassComponent,
    ButtonComponent,
    InputComponent,
    LoginComponent,
    HomeComponent,
    DialogComponent,
    RegisterBookComponent,
    DialogEditBookComponent,
    DialogEditPrestComponent,
    DialogPrestComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    FormsModule,
    MatIconModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    MatButtonModule,
    HttpClientModule,
    MatTableModule,
    MatDialogModule,
    MatSelectModule
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
