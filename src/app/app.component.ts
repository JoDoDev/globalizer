import {Component, OnInit} from '@angular/core';
import {UpdateService} from './providers/update.service';
import {MessagingService} from './providers/messaging.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private updateService: UpdateService, private message: MessagingService) {
  }

  ngOnInit() {
    this.updateService.startCheckingForUpdates();
  }
}
