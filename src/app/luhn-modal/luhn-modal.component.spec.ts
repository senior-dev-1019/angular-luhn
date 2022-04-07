import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LuhnModalComponent } from './luhn-modal.component';

describe('LuhnModalComponent', () => {
  let component: LuhnModalComponent;
  let fixture: ComponentFixture<LuhnModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LuhnModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LuhnModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
