import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {

  @Input() label: string = "";
  @Input() type: string = "";
  @Input() route: string = "";
  @Input() class: string = "";
  @Output() onClick = new EventEmitter<any>();

  onClickButton(event: Event) {
    this.onClick.emit(event);
  }


}
