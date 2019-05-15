import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalComponent } from './modal.component';

describe('ModalComponent', () => {
  let component: ModalComponent;
  let fixture: ComponentFixture<ModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    jasmine.clock().install();
    fixture = TestBed.createComponent(ModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(function() {
    jasmine.clock().uninstall();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('checking the intial value of visible and visibleanimate and verify whther they are false', () => {
    expect(component.visible).toBeFalsy();
    expect(component.visibleAnimate).toBeFalsy();
  });

  it('checking the values of visible and visibleAnimate when show method is called', () => {
    component.show();
    fixture.detectChanges();
    jasmine.clock().tick(100);
      expect(component.visible).toBeTruthy();
      expect(component.visibleAnimate).toBeTruthy();
  });

  it('checking the values of visible and visibleAnimate when hide method is called', () => {
    component.hide();
    fixture.detectChanges();
    jasmine.clock().tick(100);
    expect(component.visible).toBeFalsy();
    expect(component.visibleAnimate).toBeFalsy();
  });
});
