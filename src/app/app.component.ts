import {Component, OnInit} from '@angular/core';
import {UpdateService} from './providers/update/update.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private updateService: UpdateService) {
  }

  ngOnInit() {
    this.updateService.startCheckingForUpdates();
  }
}
