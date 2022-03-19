import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEditPrestComponent } from './dialog-edit-prest.component';

describe('DialogEditPrestComponent', () => {
  let component: DialogEditPrestComponent;
  let fixture: ComponentFixture<DialogEditPrestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogEditPrestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogEditPrestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
