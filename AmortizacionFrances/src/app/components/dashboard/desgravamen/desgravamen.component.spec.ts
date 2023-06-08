import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesgravamenComponent } from './desgravamen.component';

describe('DesgravamenComponent', () => {
  let component: DesgravamenComponent;
  let fixture: ComponentFixture<DesgravamenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DesgravamenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DesgravamenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
