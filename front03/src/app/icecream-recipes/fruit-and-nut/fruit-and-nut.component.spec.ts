import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FruitAndNutComponent } from './fruit-and-nut.component';

describe('FruitAndNutComponent', () => {
  let component: FruitAndNutComponent;
  let fixture: ComponentFixture<FruitAndNutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FruitAndNutComponent]
    });
    fixture = TestBed.createComponent(FruitAndNutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
