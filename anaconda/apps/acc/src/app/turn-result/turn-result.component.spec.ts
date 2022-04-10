import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TurnResultComponent } from './turn-result.component';

describe('TurnResultComponent', () => {
  let component: TurnResultComponent;
  let fixture: ComponentFixture<TurnResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TurnResultComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TurnResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
