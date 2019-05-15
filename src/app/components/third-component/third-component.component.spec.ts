import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThirdComponentComponent } from './third-component.component';

xdescribe('ThirdComponentComponent', () => {
  let component: ThirdComponentComponent;
  let fixture: ComponentFixture<ThirdComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThirdComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThirdComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
