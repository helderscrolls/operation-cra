import { TestBed } from '@angular/core/testing';
import { AgentsFacade } from '@operation-cra/agents';
import { MissionsFacade } from '@operation-cra/missions';
import { TimesheetsFacade } from '@operation-cra/timesheet';
import { of } from 'rxjs';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let agentsFacade: AgentsFacade;
  let missionsFacade: MissionsFacade;
  let timesheetsFacade: TimesheetsFacade;

  const agentsFacadeMock: Partial<AgentsFacade> = {
    init: jest.fn(),
  };

  const missionsFacadeMock: Partial<MissionsFacade> = {
    init: jest.fn(),
  };

  const timesheetsFacadeMock: Partial<TimesheetsFacade> = {
    init: jest.fn(),
    allTimesheets$: of([]),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        { provide: AgentsFacade, useValue: agentsFacadeMock },
        { provide: MissionsFacade, useValue: missionsFacadeMock },
        { provide: TimesheetsFacade, useValue: timesheetsFacadeMock },
      ],
    }).compileComponents();

    agentsFacade = TestBed.inject(AgentsFacade);
    missionsFacade = TestBed.inject(MissionsFacade);
    timesheetsFacade = TestBed.inject(TimesheetsFacade);
  });

  beforeEach(() => {
    const fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the facades', () => {
    jest.spyOn(agentsFacade, 'init');
    jest.spyOn(missionsFacade, 'init');
    jest.spyOn(timesheetsFacade, 'init');

    component.ngOnInit();

    expect(agentsFacade.init).toHaveBeenCalled();
    expect(missionsFacade.init).toHaveBeenCalled();
    expect(timesheetsFacade.init).toHaveBeenCalled();
  });
});
