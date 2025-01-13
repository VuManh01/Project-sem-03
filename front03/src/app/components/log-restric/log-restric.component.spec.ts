import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogRestricComponent } from './log-restric.component';

describe('LogRestricComponent', () => {
  let component: LogRestricComponent;
  let fixture: ComponentFixture<LogRestricComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LogRestricComponent]
    });
    fixture = TestBed.createComponent(LogRestricComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
