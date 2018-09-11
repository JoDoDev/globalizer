import {Component, Input, OnInit} from '@angular/core';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-chat-title-bar',
  templateUrl: './chat-title-bar.component.html',
  styleUrls: ['./chat-title-bar.component.scss']
})
export class ChatTitleBarComponent implements OnInit {
  @Input()
  userCount$: Subject<number>;

  constructor() {
  }

  ngOnInit() {

  }

}
