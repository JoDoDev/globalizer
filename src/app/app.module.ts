import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ServiceWorkerModule} from '@angular/service-worker';
import {environment} from '../environments/environment';
import {LoginComponent} from './pages/login/login.component';
import {ChatComponent} from './pages/chat/chat.component';
import {MatButtonModule, MatIconModule, MatInputModule, MatToolbarModule} from '@angular/material';
import {FormsModule} from '@angular/forms';
import { MessageBarComponent } from './components/message-bar/message-bar.component';
import { ChatboxComponent } from './components/chatbox/chatbox.component';
import { ChatTitleBarComponent } from './components/chat-title-bar/chat-title-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ChatComponent,
    MessageBarComponent,
    ChatboxComponent,
    ChatTitleBarComponent,
  ],
  imports: [
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatToolbarModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production})
  ],
  providers: [],
  entryComponents: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
