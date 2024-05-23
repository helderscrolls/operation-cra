import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MonthGridComponent } from './month-grid.component';

describe('MonthGridComponent', () => {
  let component: MonthGridComponent;
  let fixture: ComponentFixture<MonthGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MonthGridComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MonthGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit assignmentChanged event when onAgentChange is called', () => {
    const missionId = 1;
    const date = new Date();
    const agentId = 2;
    const event = { target: { value: agentId.toString() } } as any;

    jest.spyOn(component.assignmentChanged, 'emit');

    component.onAgentChange(missionId, date, event);

    expect(component.assignmentChanged.emit).toHaveBeenCalledWith({
      missionId,
      date: date.toLocaleDateString('en-US'),
      agentId,
      assigned: true,
    });
  });
});
