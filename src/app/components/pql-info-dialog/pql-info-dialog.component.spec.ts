import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PqlInfoDialogComponent } from './pql-info-dialog.component';

describe('PqlInfoDialogComponent', () => {
  let component: PqlInfoDialogComponent;
  let fixture: ComponentFixture<PqlInfoDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PqlInfoDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PqlInfoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
