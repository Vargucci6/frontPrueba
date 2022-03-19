import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogPrestComponent } from './dialog-prest.component';

describe('DialogPrestComponent', () => {
  let component: DialogPrestComponent;
  let fixture: ComponentFixture<DialogPrestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogPrestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogPrestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
