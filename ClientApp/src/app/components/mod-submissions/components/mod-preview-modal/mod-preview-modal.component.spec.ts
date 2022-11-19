import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModPreviewModalComponent } from './mod-preview-modal.component';

describe('ModPreviewModalComponent', () => {
  let component: ModPreviewModalComponent;
  let fixture: ComponentFixture<ModPreviewModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModPreviewModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModPreviewModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
