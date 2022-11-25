import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModSubmissionsComponent } from './mod-submissions.component';

describe('ModSubmissionsComponent', () => {
  let component: ModSubmissionsComponent;
  let fixture: ComponentFixture<ModSubmissionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModSubmissionsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ModSubmissionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
