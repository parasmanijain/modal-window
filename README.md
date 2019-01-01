# Modal Window

Modal Window created using Angular 7 and Bootstrap CSS to provide consistent behavior across multiple browsers and viewports without using traditional constructs like Bootstrap JS and jquery which doesn't support Stacking of Modals on top of another.

![alt text](img/chrome-modal-window.jpg)
![alt text](img/edge-modal-window.jpg)
![alt text](img/firefox-modal-window.jpg)
![alt text](img/ie11-modal-window.jpg)
![alt text](img/opera-modal-window.jpg)

## Demo

Checkout the demo on StackBlitz - https://angular7-modal-window.stackblitz.io/ 

## Adding the component in your project

### Add Component and Directives in module
Import
`
import { ModalComponent } from './components/modal/modal.component';
import { ModalService } from './components/modal/modal.service';
`

Declaration
`
declarations: [
     ModalComponent
  ]
`

Provider 
`
providers: [
     ModalService
  ]
`

### Add selector in HTML
```
<app-modal #modal1 [current]="'modal1'" 
    [previous]="null" [buttonGroup]="buttonGroup">
        <!-- First Modal Component-->
    <app-first-component [modal]="modal1">
    </app-first-component>
</app-modal>
```
```
<app-modal [buttonGroup]="buttonGroup" [current]="'modal2'" 
  [previous]="'modal1'" #modal2>
   <!-- Second Modal Component-->
    <app-second-component [modal]="modal2"></app-second-component>
</app-modal>
```

### Selector Properties
Property `current` represents current modal reference name like 'modal1'. 
`previous` represents previous modal reference name like null in the above case.
Property `modal` represents current modal template reference like `#modal1` in the above case.

If second modal (`modal2`) gets opened on top of first modal (`modal1`) then `current` becomes `modal2`, previous becomes `modal1` and `modal` becomes `#modal2`

```
@ViewChild('modal2') modal2;
```
Property `buttonGroup` represents class being used for action buttons in the footer like `modal-footer` in the modal created in the below example.

```
  <div [ngClass]="buttonGroup">
    <button type="button" class="btn  btn-autosize btn-default" (click)="modal.hide()">Close</button>
    <button type="button" class="btn btn-autosize btn-default" (click)="modal2.show()">Show modal 2</button>
    <button type="button" class="btn  btn-autosize btn-primary" (click)="save()">Save</button>
  </div>
```

### modal.service.ts
``` typescript
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class ModalService {

  constructor() { }

  public show(modal): void {
    modal.visible = true;
    setTimeout(() => {
      modal.visibleAnimate = true;
    }, 100);
  }

  public hide(modal): void {
    modal.visibleAnimate = false;
    setTimeout(() => {
      modal.visible = false;
    }, 100);
  }
}
```

### modal.component.ts
``` typescript
import { Component, OnInit, Inject, Input} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ModalService } from './modal.service';

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

  constructor(private modalService: ModalService,
    @Inject(DOCUMENT) private document: Document) { }

  ngOnInit() {
  }

  public show(): void {
    let previousbuttons;
    this.modalService.show(this);
    if (this.previous) {
      previousbuttons = this.document.body.querySelector('#' + this.previous + ' .' + this.buttonGroup).getElementsByTagName('button');
      for (const button of previousbuttons) {
        button.disabled = true;
      }
     }
  }

  public hide(): void {
    let previousbuttons;
   this.modalService.hide(this);
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

```

### modal.component.html
``` html
<div class="modal fade" aria-hidden="true" tabindex="0" id="{{current}}"
[ngClass]="{'in': visibleAnimate}"
[ngStyle]="{'display': visible ? 'block' : 'none', 'opacity': visibleAnimate ? 1 : 0}">
  <div class="modal-dialog modal-lg modal-dialog-centered">
    <div class="modal-content">
        <ng-content></ng-content>
    </div>
  </div>
</div>
<div [class.modal-overlay]="visible==true" tabindex="-1">
</div>
```

### modal.component.css
``` css
  .modal {
    position: fixed;
    margin: auto;
    z-index: 1100;
    width:100% !important;
    height:100% !important;
    transform: translate(0%, 0%);
    min-width:90% !important;
    min-height:500px !important;
    max-width:95vh !important;
    max-height:95vh !important;
  }

   .modal-dialog {
     max-width:95vw !important;
     max-height:95vh !important;
   } 
  .modal-content{   
    position: absolute !important;
    max-width:90vw !important;
    max-height: 90vh !important;
  }

  .modal-overlay {
    z-index: 1000;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .modal.fade .modal-dialog {
    transform: translate(0%,0%);
  }

  .body {
    overflow:hidden !important;
  }

 
```

## First Modal Window

### first-component.component.ts
``` typescript
import { Component, OnInit, Input, ViewChild, TemplateRef, Output, EventEmitter } from '@angular/core';
import { HTML_CODES} from '../../constants/constants';

@Component({
  selector: 'app-first-component',
  templateUrl: './first-component.component.html',
  styleUrls: ['./first-component.component.css']
})
export class FirstComponentComponent implements OnInit {

  @Input() modal;

  @ViewChild('modal2') modal2;

  public buttonGroup = 'modal-footer';

  public close = HTML_CODES.close;

  constructor() { }

  ngOnInit() {
  }

  save() {
    alert('changes for Modal 1 saved');
  }
}

```
### first-component.component.html
``` html
  <div class="modal-header">
    Modal 1 Header
    <span class="close" [innerHTML]="close" (click)="modal.hide()"></span>
  </div>
  <div class="modal-body">
    <div>Clicking outside or pressing Escape Key will not work.</div>
    <div>Click on <span [innerHTML]="close"></span> or Close Button to close the First Modal Window.</div>
    <div>Click on Save button to save the changes.</div>
    <div>Click on Show Modal 2 to open second modal window on top of first.</div>
    <br/>
    <div>
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    </div>
  </div>
  <div [ngClass]="buttonGroup">
    <button type="button" class="btn  btn-autosize btn-default" (click)="modal.hide()">Close</button>
    <button type="button" class="btn btn-autosize btn-default" (click)="modal2.show()">Show modal 2</button>
    <button type="button" class="btn  btn-autosize btn-primary" (click)="save()">Save</button>
  </div>
<app-modal [buttonGroup]="buttonGroup" [current]="'modal2'" [previous]="'modal1'" #modal2>
     <!-- Second Modal Component-->
    <app-second-component [modal]="modal2"></app-second-component>
</app-modal>
```
## Second Modal Window

### second-component.component.ts
``` typescript
import { Component, OnInit, Input, ViewChild} from '@angular/core';
import { HTML_CODES} from '../../constants/constants';

@Component({
  selector: 'app-second-component',
  templateUrl: './second-component.component.html',
  styleUrls: ['./second-component.component.css']
})
export class SecondComponentComponent implements OnInit {

  @Input() modal;

  @ViewChild('modal3') modal3;

  public buttonGroup = 'modal-footer';

  public close = HTML_CODES.close;

  constructor() { }

  ngOnInit() {
  }

  save() {
    alert('changes for Modal 2 saved');
  }
}

```
### second-component.component.html
``` html
      <div class="modal-header">
  Modal 2 Header
  <span class="close" [innerHTML]="close" (click)="modal.hide()"></span>
</div>
    <div class="modal-body">
        <div>Clicking outside or pressing Escape Key will not work.</div>
        <div>Click on <span [innerHTML]="close"></span> or Close Button to close the Second Modal Window.</div>
        <div>Click on Save button to save the changes.</div>
        <div>Click on Show Modal 3 to open third modal window on top of second.</div>
        <br/>
        <div>
            "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?"
        </div>
    </div>
  <div [ngClass]="buttonGroup">
    <button type="button" class="btn  btn-autosize btn-default" (click)="modal.hide()">Close</button>
  <button type="button" class="btn  btn-autosize btn-default" (click)="modal3.show()">Show modal 3</button>
  <button type="button" class="btn  btn-autosize btn-primary" (click)="save()">Save</button>
</div>
<app-modal  [buttonGroup]="buttonGroup" [current]="'modal3'" [previous]="'modal2'" #modal3>
    <!-- Third Modal Component-->
    <app-third-component [modal]="modal3"></app-third-component>
</app-modal>
```
## Styles for making the modal windows responsive and compatible across browsers

### styles.css
```css
/* You can add global styles to this file, and also import other style files */

.modal-footer {
    height: 100% !important;
    max-height:10vh !important;  
}

.modal-body {
    padding:2%;
    max-height:50vh !important;
    overflow: auto !important;
}

.modal-header {
    padding:2%;
    max-height: 10vh !important;
}

.close {
    cursor: pointer;
}

.instruction {
    margin:10px;
    top:10px;
  }

  .btn {
    white-space: normal !important
  }

  .btn-autosize {
    padding: 1px 5px;
    font-size: 12px;
    line-height: 1.5;
    border-radius: 3px;
  }
  @media screen and (min-width: 768px) {
    .btn-autosize {
      padding: 4px 8px;
      font-size: 12px;
      line-height: 1.5;
      border-radius: 3px;
    }
  }
  @media screen and (min-width: 992px) {
    .btn-autosize {
      padding: 8px 14px;
      font-size: 16px;
      line-height: 1.33;
      border-radius: 6px;
    }
  }
```
## Author

parasmani.jain2208@gmail.com
