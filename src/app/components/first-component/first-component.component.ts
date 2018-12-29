import { Component, OnInit, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'app-first-component',
  templateUrl: './first-component.component.html',
  styleUrls: ['./first-component.component.css']
})
export class FirstComponentComponent implements OnInit {

  @Input() modal;

  @ViewChild('modal2') modal2;

  constructor() { }

  ngOnInit() {
  }

  save() {
    alert('changes for Modal 1 saved');
  }
}
