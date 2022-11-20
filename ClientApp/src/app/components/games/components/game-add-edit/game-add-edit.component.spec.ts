import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameAddEditComponent } from './game-add-edit.component';

describe('GameAddEditComponent', () => {
  let component: GameAddEditComponent;
  let fixture: ComponentFixture<GameAddEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GameAddEditComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GameAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
