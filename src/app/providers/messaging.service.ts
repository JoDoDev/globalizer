import {Injectable} from '@angular/core';
import * as io from 'socket.io-client';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MessagingService {
  socket: SocketIOClient.Socket;

  constructor() {
    console.log("starting service")
    if (environment.production) {
      this.socket = io.connect()
    } else {
      this.socket = io.connect(environment.baseUrl)
    }
  }


}
