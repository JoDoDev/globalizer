import {Component, OnInit} from '@angular/core';
import {MessagingService} from '../../providers/messaging/messaging.service';
import {BehaviorSubject, Subject} from 'rxjs';
import {Message} from '../../types/message.type';
import {UserCountService} from '../../providers/user-count/user-count.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent {
  messages$: Subject<Message[]>;
  userCount$: BehaviorSubject<number>;
  newMessage: string;

  constructor(private messagingService: MessagingService, private userCountService: UserCountService) {
    this.messages$ = this.messagingService.messages$;
    this.userCount$ = this.userCountService.userCount$;
  }

  sendMessage() {
    this.messagingService.send(this.newMessage);
  }

}
