import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DotsAndSquaresComponent } from './dots-and-squares.component';

describe('DotsAndSquaresComponent', () => {
  let component: DotsAndSquaresComponent;
  let fixture: ComponentFixture<DotsAndSquaresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DotsAndSquaresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DotsAndSquaresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
