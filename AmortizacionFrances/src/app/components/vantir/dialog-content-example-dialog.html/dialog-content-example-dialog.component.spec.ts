import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogContentExampleDialog } from './dialog-content-example-dialog.component';

describe('DialogContentExampleDialogHtmlComponent', () => {
  let component: DialogContentExampleDialog;
  let fixture: ComponentFixture<DialogContentExampleDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogContentExampleDialog ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogContentExampleDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
