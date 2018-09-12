import {Injectable} from '@angular/core';
import {SocketService} from '../socket/socket.service';
import {BehaviorSubject} from 'rxjs';
import {SocketEventType} from '../socket/socket-event-type.enum';

@Injectable({
  providedIn: 'root'
})
export class UserCountService {
  public userCount$: BehaviorSubject<number> = new BehaviorSubject(0);

  constructor(private socketService: SocketService) {
    this.socketService.subscribe(SocketEventType.USER_COUNT, (userCount) => {
      console.log('User Count change: ', userCount);
      this.userCount$.next(userCount);
    });

    this.socketService.send(SocketEventType.USER_COUNT);
  }
}
