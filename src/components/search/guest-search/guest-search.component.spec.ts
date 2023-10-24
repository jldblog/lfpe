import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestSearchComponent } from './guest-search.component';

describe('GuestSearchComponent', () => {
  let component: GuestSearchComponent;
  let fixture: ComponentFixture<GuestSearchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GuestSearchComponent]
    });
    fixture = TestBed.createComponent(GuestSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
