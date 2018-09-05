import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../providers/auth/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  public username = '';


  constructor(private authService: AuthService, private router: Router) {

  }

  public async login() {
    if(await this.authService.authenticateWithUsername(this.username)) {
      this.router.navigate(['/']);
    }
  }

}
