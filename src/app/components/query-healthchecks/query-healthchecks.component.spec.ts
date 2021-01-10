import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QueryHealthchecksComponent } from './query-healthchecks.component';

describe('QueryHealthchecksComponent', () => {
  let component: QueryHealthchecksComponent;
  let fixture: ComponentFixture<QueryHealthchecksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QueryHealthchecksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QueryHealthchecksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
