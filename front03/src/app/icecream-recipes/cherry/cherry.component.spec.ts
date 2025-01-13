import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CherryComponent } from './cherry.component';

describe('CherryComponent', () => {
  let component: CherryComponent;
  let fixture: ComponentFixture<CherryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CherryComponent]
    });
    fixture = TestBed.createComponent(CherryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
