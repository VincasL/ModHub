import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameGridCard } from './game-grid-card.component';

describe('GameCardComponent', () => {
  let component: GameGridCard;
  let fixture: ComponentFixture<GameGridCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GameGridCard],
    }).compileComponents();

    fixture = TestBed.createComponent(GameGridCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
