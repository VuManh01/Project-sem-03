import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BananaComponent } from './banana.component';

describe('BananaComponent', () => {
  let component: BananaComponent;
  let fixture: ComponentFixture<BananaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BananaComponent]
    });
    fixture = TestBed.createComponent(BananaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
