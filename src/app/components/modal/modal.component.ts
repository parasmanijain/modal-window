import { Component, OnInit, Inject, Input} from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  @Input() current;

  @Input() previous;

  @Input() buttonGroup;

  public visible = false;
  public visibleAnimate = false;

  constructor(@Inject(DOCUMENT) private document: Document) { }

  ngOnInit() {
  }

  public show(): void {
    let previousbuttons;
    this.visible = true;
    setTimeout(() => {
      this.visibleAnimate = true;
    }, 100);
    if (this.previous) {
      previousbuttons = this.document.body.querySelector('#' + this.previous + ' .' + this.buttonGroup).getElementsByTagName('button');
      for (const button of previousbuttons) {
        button.disabled = true;
      }
     }
  }

  public hide(): void {
    let previousbuttons;
    this.visibleAnimate = false;
    setTimeout(() => {
      this.visible = false;
    }, 100);
   if (this.previous) {
    previousbuttons = this.document.body.querySelector('#' + this.previous + ' .' + this.buttonGroup).getElementsByTagName('button');
    for (const button of previousbuttons) {
      button.disabled = false;
    }
   }

  }

  public onContainerClicked(event: MouseEvent): void {
    if ((<HTMLElement>event.target).classList.contains('modal')) {
      this.hide();
    }
  }
}
