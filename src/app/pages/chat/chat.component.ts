import {Component, OnInit} from '@angular/core';
import {MessagingService} from '../../providers/messaging/messaging.service';
import {BehaviorSubject, Subject} from 'rxjs';
import {Message} from '../../types/message.type';
import {UserCountService} from '../../providers/user-count/user-count.service';
import {AuthService} from '../../providers/auth/auth.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent {
  messages$: Subject<Message[]>;
  userCount$: BehaviorSubject<number>;
  userKey: string;
  newMessage: string;

  constructor(
    private messagingService: MessagingService,
    private userCountService: UserCountService,
    private authService: AuthService) {
    this.messages$ = this.messagingService.messages$;
    this.userCount$ = this.userCountService.userCount$;
    this.userKey = this.authService.userKey;
  }

  sendMessage() {
    this.messagingService.send(this.newMessage);
  }

}
