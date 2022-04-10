import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameShellComponent } from './game-shell.component';

describe('GameShellComponent', () => {
  let component: GameShellComponent;
  let fixture: ComponentFixture<GameShellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GameShellComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GameShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
