import {Injectable} from '@angular/core';
import {SocketService} from '../socket/socket.service';
import {Subject} from 'rxjs';
import {Message} from '../../types/message.type';
import {SocketEventType} from '../socket/socket-event-type.enum';

@Injectable({
  providedIn: 'root'
})
export class MessagingService {
  public messages: Message[] = [];
  public messages$: Subject<Message[]> = new Subject<Message[]>();

  constructor(private socketService: SocketService) {
    this.socketService.subscribe(SocketEventType.MESSAGES, (messages: Message[]) => {
      this.messages = this.messages.concat(messages);
      this.messages$.next(this.messages);
    });
  }


}
