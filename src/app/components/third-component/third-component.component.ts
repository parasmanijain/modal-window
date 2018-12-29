import { Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-third-component',
  templateUrl: './third-component.component.html',
  styleUrls: ['./third-component.component.css']
})
export class ThirdComponentComponent implements OnInit {


  @Input() modal;

  constructor() { }

  ngOnInit() {
  }

  save() {
    alert('changes for Modal 3 saved');
  }
}
