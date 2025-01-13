import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MangoComponent } from './mango.component';

describe('MangoComponent', () => {
  let component: MangoComponent;
  let fixture: ComponentFixture<MangoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MangoComponent]
    });
    fixture = TestBed.createComponent(MangoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
