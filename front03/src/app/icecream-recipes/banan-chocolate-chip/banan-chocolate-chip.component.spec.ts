import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BananChocolateChipComponent } from './banan-chocolate-chip.component';

describe('BananChocolateChipComponent', () => {
  let component: BananChocolateChipComponent;
  let fixture: ComponentFixture<BananChocolateChipComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BananChocolateChipComponent]
    });
    fixture = TestBed.createComponent(BananChocolateChipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
