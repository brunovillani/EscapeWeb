import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SantosDumontComponent } from './santos-dumont.component';

describe('SantosDumontComponent', () => {
  let component: SantosDumontComponent;
  let fixture: ComponentFixture<SantosDumontComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SantosDumontComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SantosDumontComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
