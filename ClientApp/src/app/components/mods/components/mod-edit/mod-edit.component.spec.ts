import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModEditComponent } from './mod-edit.component';

describe('ModEditComponent', () => {
  let component: ModEditComponent;
  let fixture: ComponentFixture<ModEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
