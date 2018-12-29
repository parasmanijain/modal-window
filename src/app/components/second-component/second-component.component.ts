import { Component, OnInit, Input, ViewChild} from '@angular/core';

@Component({
  selector: 'app-second-component',
  templateUrl: './second-component.component.html',
  styleUrls: ['./second-component.component.css']
})
export class SecondComponentComponent implements OnInit {

  @Input() modal;

  @ViewChild('modal3') modal3;
  constructor() { }

  ngOnInit() {
  }

  save() {
    alert('changes for Modal 2 saved');
  }

}
