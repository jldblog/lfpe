import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ResultsDataViewComponent } from './results-dataview.component';

describe('ResultsDataViewComponent', () => {
  let component: ResultsDataViewComponent;
  let fixture: ComponentFixture<ResultsDataViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ResultsDataViewComponent]
    });
    fixture = TestBed.createComponent(ResultsDataViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
