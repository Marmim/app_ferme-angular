import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatSidenavComponent } from './mat-sidenav.component';

describe('MatSidenavComponent', () => {
  let component: MatSidenavComponent;
  let fixture: ComponentFixture<MatSidenavComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MatSidenavComponent]
    });
    fixture = TestBed.createComponent(MatSidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
