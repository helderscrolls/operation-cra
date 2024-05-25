import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AgentsFacade } from '@operation-cra/agents';
import { MissionsFacade } from '@operation-cra/missions';
import { of } from 'rxjs';
import { TimesheetsFacade } from './+state/timesheets.facade';
import { TimesheetComponent } from './timesheet.component';

describe('TimesheetComponent', () => {
  let component: TimesheetComponent;
  let fixture: ComponentFixture<TimesheetComponent>;
  let agentsFacade: AgentsFacade;
  let missionsFacade: MissionsFacade;
  let timesheetsFacade: TimesheetsFacade;

  const agentsFacadeMock: Partial<AgentsFacade> = {
    allAgents$: of([]),
  };

  const missionsFacadeMock: Partial<MissionsFacade> = {
    allMissions$: of([]),
  };

  const timesheetsFacadeMock: Partial<TimesheetsFacade> = {
    allTimesheets$: of([]),
    saveTimesheets: jest.fn(),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TimesheetComponent],
      providers: [
        { provide: AgentsFacade, useValue: agentsFacadeMock },
        { provide: MissionsFacade, useValue: missionsFacadeMock },
        { provide: TimesheetsFacade, useValue: timesheetsFacadeMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TimesheetComponent);
    component = fixture.componentInstance;
    agentsFacade = TestBed.inject(AgentsFacade);
    missionsFacade = TestBed.inject(MissionsFacade);
    timesheetsFacade = TestBed.inject(TimesheetsFacade);
    fixture.detectChanges();

    jest.clearAllMocks();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle dark mode', () => {
    const classListSpy = jest.spyOn(
      document.documentElement.classList,
      'toggle'
    );

    component.toggleDarkMode();

    expect(classListSpy).toHaveBeenCalledWith('dark');
  });

  it('should update current month on month change', () => {
    const newMonth = 5;
    jest.spyOn(component, 'onMonthChanged');

    component.onMonthChanged(newMonth);

    expect(component.currentMonth).toBe(newMonth);
    expect(component.onMonthChanged).toHaveBeenCalled();
  });

  it('should call saveTimesheets with correct arguments', () => {
    const event = {
      missionId: 1,
      date: '2022-01-01',
      agentId: 1,
      assigned: true,
    };

    const expectedSaveTimesheetsArgument = {
      id: `${event.missionId}-${event.date}`,
      missionId: event.missionId,
      date: event.date,
      agentId: event.assigned ? event.agentId : null,
    };

    const saveTimesheetsSpy = jest.spyOn(timesheetsFacade, 'saveTimesheets');

    component.onAssignmentChanged(event);

    expect(saveTimesheetsSpy).toHaveBeenCalledWith(
      expectedSaveTimesheetsArgument
    );
  });
});
