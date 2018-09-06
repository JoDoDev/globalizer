import {Injectable} from '@angular/core';
import {SocketService} from '../socket/socket.service';
import {Router} from '@angular/router';
import {SocketEventType} from '../socket/socket-event-type.enum';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = false;
  private username = '';

  constructor(private socketService: SocketService, private router: Router) {

  }

  public async canAuthenticate() {
    if (this.isAuthenticated) {
      return true;
    }

    if (this.getUserId() != null) {
      return await this.authenticateWithUserId(this.getUserId());
    }

    return false;
  }

  public async authenticateWithUsername(username: string) {
    return new Promise((resolve, reject) => {
      this.socketService.send(SocketEventType.AUTH_USERNAME, username);

      this.socketService.once(SocketEventType.AUTH_USERNAME, async ({success, userId}) => {
        console.log(`userId auth success: ${success}, username: ${userId}`);

        if (success) {
          this.setUserId(userId);
        }
        this.isAuthenticated = success;
        resolve(success);
      });
    });
  }

  public authenticateWithUserId(userId: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.socketService.send(SocketEventType.AUTH_USER_ID, userId);

      this.socketService.once(SocketEventType.AUTH_USER_ID, async ({success, username}) => {
        console.log(`userId auth success: ${success}, username: ${username}`);

        if (success) {
          this.setUsername(username);
        }
        this.isAuthenticated = success;
        resolve(success);
      });
    });
  }

  public getUsername(): string {
    return this.username;
  }

  public setUsername(username: string) {
    this.username = username;
  }

  public getUserId(): string {
    return localStorage.getItem('USER_ID');
  }

  public setUserId(userId: string) {
    localStorage.setItem('USER_ID', userId);
  }

}
