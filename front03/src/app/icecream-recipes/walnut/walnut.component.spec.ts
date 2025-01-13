import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WalnutComponent } from './walnut.component';

describe('WalnutComponent', () => {
  let component: WalnutComponent;
  let fixture: ComponentFixture<WalnutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WalnutComponent]
    });
    fixture = TestBed.createComponent(WalnutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
