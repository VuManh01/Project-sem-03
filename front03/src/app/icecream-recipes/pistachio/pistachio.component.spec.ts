import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PistachioComponent } from './pistachio.component';

describe('PistachioComponent', () => {
  let component: PistachioComponent;
  let fixture: ComponentFixture<PistachioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PistachioComponent]
    });
    fixture = TestBed.createComponent(PistachioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
