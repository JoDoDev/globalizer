import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ChatComponent} from './pages/chat/chat.component';
import {LoginComponent} from './pages/login/login.component';
import {AuthenticatedGuard} from './guards/authenticated.guard';

const routes: Routes = [
  {component: ChatComponent, path: '', canActivate: [AuthenticatedGuard]},
  {component: LoginComponent, path: 'login'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
