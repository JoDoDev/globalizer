import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import * as io from 'socket.io-client';
import {SocketEventType} from './socket-event-type.enum';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  socket: SocketIOClient.Socket;

  constructor() {
    if (environment.production) {
      this.socket = io.connect();
    } else {
      this.socket = io.connect(environment.baseUrl);
    }
  }

  public subscribe(eventType: SocketEventType, fun: (obj: any) => any): () => void {
    const emitter = this.socket.on(eventType, fun);
    return () => {
      emitter.removeListener(eventType, fun);
    };
  }

  public once(eventType: SocketEventType, fun: (obj: any) => any): void {
    this.socket.once(eventType, fun);
  }

  public send(eventType: SocketEventType, obj?: any) {
    if (obj != undefined)
      this.socket.emit(eventType, obj);
    else
      this.socket.emit(eventType);
  }
}
