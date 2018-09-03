import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ChatComponent} from './chat/chat.component';
import {LoginComponent} from './login/login.component';

const routes: Routes = [
  {component: ChatComponent, path: '/'},
  {component: LoginComponent, path: '/login'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
