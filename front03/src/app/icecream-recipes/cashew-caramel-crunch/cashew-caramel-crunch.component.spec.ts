import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CashewCaramelCrunchComponent } from './cashew-caramel-crunch.component';

describe('CashewCaramelCrunchComponent', () => {
  let component: CashewCaramelCrunchComponent;
  let fixture: ComponentFixture<CashewCaramelCrunchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CashewCaramelCrunchComponent]
    });
    fixture = TestBed.createComponent(CashewCaramelCrunchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
