import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrawerFormComponent } from './drawer-form.component';

describe('DrawerFormComponent', () => {
  let component: DrawerFormComponent;
  let fixture: ComponentFixture<DrawerFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DrawerFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DrawerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
