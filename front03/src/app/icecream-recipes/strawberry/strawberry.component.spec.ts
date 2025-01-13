import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StrawberryComponent } from './strawberry.component';

describe('StrawberryComponent', () => {
  let component: StrawberryComponent;
  let fixture: ComponentFixture<StrawberryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StrawberryComponent]
    });
    fixture = TestBed.createComponent(StrawberryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
