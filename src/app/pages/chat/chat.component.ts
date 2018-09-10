import {Component, OnInit} from '@angular/core';
import {MessagingService} from '../../providers/messaging/messaging.service';
import {Subject} from 'rxjs';
import {Message} from '../../types/message.type';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent {
  messages$: Subject<Message[]>;
  newMessage: string;

  constructor(private messagingService: MessagingService) {
    this.messages$ = this.messagingService.messages$;
  }

  sendMessage() {
    this.messagingService.send(this.newMessage);
  }

}
