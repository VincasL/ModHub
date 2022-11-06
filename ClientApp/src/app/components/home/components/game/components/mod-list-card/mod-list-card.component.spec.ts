import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModListCardComponent } from './mod-list-card.component';

describe('ModListCardComponent', () => {
  let component: ModListCardComponent;
  let fixture: ComponentFixture<ModListCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModListCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModListCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
