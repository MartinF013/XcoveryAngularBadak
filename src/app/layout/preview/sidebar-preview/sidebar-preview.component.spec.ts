import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarPreviewComponent } from './sidebar-preview.component';

describe('SidebarPreviewComponent', () => {
  let component: SidebarPreviewComponent;
  let fixture: ComponentFixture<SidebarPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidebarPreviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidebarPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
