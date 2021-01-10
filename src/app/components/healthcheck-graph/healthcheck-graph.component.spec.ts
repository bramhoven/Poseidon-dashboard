import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HealthcheckGraphComponent } from './healthcheck-graph.component';

describe('HealthcheckGraphComponent', () => {
  let component: HealthcheckGraphComponent;
  let fixture: ComponentFixture<HealthcheckGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HealthcheckGraphComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HealthcheckGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
