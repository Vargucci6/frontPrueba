import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEditBookComponent } from './dialog-edit-book.component';

describe('DialogEditBookComponent', () => {
  let component: DialogEditBookComponent;
  let fixture: ComponentFixture<DialogEditBookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogEditBookComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogEditBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
