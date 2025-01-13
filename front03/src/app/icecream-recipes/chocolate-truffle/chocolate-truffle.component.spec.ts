import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChocolateTruffleComponent } from './chocolate-truffle.component';

describe('ChocolateTruffleComponent', () => {
  let component: ChocolateTruffleComponent;
  let fixture: ComponentFixture<ChocolateTruffleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChocolateTruffleComponent]
    });
    fixture = TestBed.createComponent(ChocolateTruffleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
