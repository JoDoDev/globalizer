import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-message-bar',
  templateUrl: './message-bar.component.html',
  styleUrls: ['./message-bar.component.scss']
})
export class MessageBarComponent {
  messageValue = '';

  @Output() send = new EventEmitter();
  @Output() messageChange = new EventEmitter<string>();

  @Input()
  get message() {
    return this.messageValue;
  }

  set message(val) {
    this.messageValue = val;
    this.messageChange.emit(this.messageValue);
  }

  sendMessage() {
    this.send.emit();
    this.messageValue = '';
  }

}
