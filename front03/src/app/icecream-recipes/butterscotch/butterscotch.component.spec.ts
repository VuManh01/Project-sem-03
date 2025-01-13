import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButterscotchComponent } from './butterscotch.component';

describe('ButterscotchComponent', () => {
  let component: ButterscotchComponent;
  let fixture: ComponentFixture<ButterscotchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ButterscotchComponent]
    });
    fixture = TestBed.createComponent(ButterscotchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
