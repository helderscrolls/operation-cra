import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MonthSelectorComponent } from './month-selector.component';

describe('MonthSelectorComponent', () => {
  let component: MonthSelectorComponent;
  let fixture: ComponentFixture<MonthSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MonthSelectorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MonthSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit monthChanged event on month selection change', () => {
    const selectedMonth = 5;
    const selectElement = fixture.nativeElement.querySelector('select');
    jest.spyOn(component.monthChanged, 'emit');

    selectElement.value = selectedMonth;
    selectElement.dispatchEvent(new Event('change'));

    expect(component.monthChanged.emit).toHaveBeenCalledWith(selectedMonth);
  });

  it('should return correct month name', () => {
    const monthIndex = 0; // January
    const expectedMonthName = 'January';

    const monthName = component.getMonthName(monthIndex);

    expect(monthName).toEqual(expectedMonthName);
  });
});
