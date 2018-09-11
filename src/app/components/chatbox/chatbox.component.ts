import {Component, Input, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {Message} from '../../types/message.type';

@Component({
  selector: 'app-chatbox',
  templateUrl: './chatbox.component.html',
  styleUrls: ['./chatbox.component.scss']
})
export class ChatboxComponent implements OnInit {

  @Input()
  messages$: Subject<Message[]>;


  constructor() { }

  ngOnInit() {
  }

}
