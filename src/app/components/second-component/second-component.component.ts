import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-second-component',
  templateUrl: './second-component.component.html',
  styleUrls: ['./second-component.component.css']
})
export class SecondComponentComponent implements OnInit {

  @Input() modal;
  constructor() { }

  ngOnInit() {
  }

  hide() {
    this.modal.hide();
  }

  save() {
    alert('changes for Modal 2 saved');
  }

}
