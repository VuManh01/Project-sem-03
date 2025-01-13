import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KiwiComponent } from './kiwi.component';

describe('KiwiComponent', () => {
  let component: KiwiComponent;
  let fixture: ComponentFixture<KiwiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [KiwiComponent]
    });
    fixture = TestBed.createComponent(KiwiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
