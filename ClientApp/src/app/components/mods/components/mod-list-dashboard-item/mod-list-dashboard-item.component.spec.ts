import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModListDashboardItemComponent } from './mod-list-dashboard-item.component';

describe('ModListDashboardItemComponent', () => {
  let component: ModListDashboardItemComponent;
  let fixture: ComponentFixture<ModListDashboardItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModListDashboardItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModListDashboardItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
