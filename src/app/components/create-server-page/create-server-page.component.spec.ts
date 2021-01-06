import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateServerPageComponent } from './create-server-page.component';

describe('CreateServerPageComponent', () => {
  let component: CreateServerPageComponent;
  let fixture: ComponentFixture<CreateServerPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateServerPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateServerPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
