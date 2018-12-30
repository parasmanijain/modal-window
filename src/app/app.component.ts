import { Component, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'modal-window';

  public buttonGroup = 'modal-footer';

  @ViewChild('modal1') modal1;

  show() {
    this.modal1.show();
  }
}
