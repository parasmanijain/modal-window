import { Component, OnInit, Input, ViewChild, TemplateRef, Output, EventEmitter } from '@angular/core';
import { HTML_CODES} from '../../constants/constants';

@Component({
  selector: 'app-first-component',
  templateUrl: './first-component.component.html',
  styleUrls: ['./first-component.component.css']
})
export class FirstComponentComponent implements OnInit {

  @Input() modal;

  @ViewChild('modal2', {static: true} ) modal2;

  public buttonGroup = 'modal-footer';

  public close = HTML_CODES.close;

  constructor() { }

  ngOnInit() {
  }

  save() {
    alert('changes for Modal 1 saved');
  }
}
