import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChocolateAlmondComponent } from './chocolate-almond.component';

describe('ChocolateAlmondComponent', () => {
  let component: ChocolateAlmondComponent;
  let fixture: ComponentFixture<ChocolateAlmondComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChocolateAlmondComponent]
    });
    fixture = TestBed.createComponent(ChocolateAlmondComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
