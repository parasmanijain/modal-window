import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-first-component',
  templateUrl: './first-component.component.html',
  styleUrls: ['./first-component.component.css']
})
export class FirstComponentComponent implements OnInit {

  @Input() modal;
  constructor() { }


  ngOnInit() {
  }

  hide() {
    this.modal.hide();
  }

  save() {
    alert('changes for Modal 1 saved');
  }

}
