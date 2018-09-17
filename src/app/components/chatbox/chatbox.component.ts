import {Component, Input} from '@angular/core';
import {Subject} from 'rxjs';
import {Message} from '../../types/message.type';

@Component({
  selector: 'app-chatbox',
  templateUrl: './chatbox.component.html',
  styleUrls: ['./chatbox.component.scss']
})
export class ChatboxComponent {

  @Input()
  messages$: Subject<Message[]>;

  @Input()
  userKey: string;

  @Input()
  scrollToBottom = true;

  constructor() {
  }

  scrollInView(el) {
    if (this.scrollToBottom)
      el.scrollIntoView();
  }

}
