import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RoundSearchComponent } from './round-search.component';

describe('GuestSearchComponent', () => {
  let component: RoundSearchComponent;
  let fixture: ComponentFixture<RoundSearchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RoundSearchComponent]
    });
    fixture = TestBed.createComponent(RoundSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
