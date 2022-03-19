import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  ControlContainer,
  AbstractControl,
} from '@angular/forms';
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
  selector: 'app-input-pass',
  templateUrl: './input-pass.component.html',
  styleUrls: ['./input-pass.component.scss'],
  viewProviders: [
    {
      provide: ControlContainer,
      useExisting: FormGroupDirective,
    },
  ],
})
export class InputPassComponent {
  @Input() name: any;
  @Input() title: string = '';
  @Input() password1: string;
  @Input() control: AbstractControl;
  @Input() icon: string = 'visibility';
  type = 'password';

  matcher = new MyErrorStateMatcher();

  getPasswordMatch(): boolean {
    const obj = {
      ps1: this.password1,
      ps2: this.control.value,
    };

    console.log(obj);
    return String(this.password1) === String(this.control.value);
  }
}
