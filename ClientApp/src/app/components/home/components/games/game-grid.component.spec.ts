import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameGrid } from './game-grid.component';

describe('GamesComponent', () => {
  let component: GameGrid;
  let fixture: ComponentFixture<GameGrid>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GameGrid],
    }).compileComponents();

    fixture = TestBed.createComponent(GameGrid);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
