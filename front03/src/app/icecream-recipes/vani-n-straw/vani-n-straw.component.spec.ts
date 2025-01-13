import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VaniNStrawComponent } from './vani-n-straw.component';

describe('VaniNStrawComponent', () => {
  let component: VaniNStrawComponent;
  let fixture: ComponentFixture<VaniNStrawComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VaniNStrawComponent]
    });
    fixture = TestBed.createComponent(VaniNStrawComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
