import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VANTIRComponent } from './vantir.component';

describe('VANTIRComponent', () => {
  let component: VANTIRComponent;
  let fixture: ComponentFixture<VANTIRComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VANTIRComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VANTIRComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
