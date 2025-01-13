import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlackCurrantComponent } from './black-currant.component';

describe('BlackCurrantComponent', () => {
  let component: BlackCurrantComponent;
  let fixture: ComponentFixture<BlackCurrantComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BlackCurrantComponent]
    });
    fixture = TestBed.createComponent(BlackCurrantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
