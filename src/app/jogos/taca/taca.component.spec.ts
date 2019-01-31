import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TacaComponent } from './taca.component';

describe('TacaComponent', () => {
  let component: TacaComponent;
  let fixture: ComponentFixture<TacaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TacaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TacaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
