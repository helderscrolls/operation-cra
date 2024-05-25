import { Component, OnInit, inject } from '@angular/core';
import { AgentsEntity, AgentsFacade } from '@operation-cra/agents';
import { MissionsEntity, MissionsFacade } from '@operation-cra/missions';
import { Observable } from 'rxjs';
import { TimesheetsFacade } from './+state/timesheets.facade';
import { TimesheetsEntity } from './+state/timesheets.models';
import { MonthGridComponent } from './ui/month-grid/month-grid.component';
import { MonthSelectorComponent } from './ui/month-selector/month-selector.component';
import { getDaysInMonth } from './utils/date-utils';

@Component({
  selector: 'lib-timesheet',
  standalone: true,
  imports: [MonthGridComponent, MonthSelectorComponent],
  templateUrl: './timesheet.component.html',
  styleUrl: './timesheet.component.scss',
})
export class TimesheetComponent implements OnInit {
  private readonly agentsFacade = inject(AgentsFacade);
  private readonly missionsFacade = inject(MissionsFacade);
  private readonly timesheetsFacade = inject(TimesheetsFacade);

  missions$: Observable<MissionsEntity[]> = this.missionsFacade.allMissions$;
  agents$: Observable<AgentsEntity[]> = this.agentsFacade.allAgents$;
  timesheets$: Observable<TimesheetsEntity[]> =
    this.timesheetsFacade.allTimesheets$;

  currentMonth = new Date().getMonth();
  currentYear = new Date().getFullYear();
  days: Date[] = [];

  ngOnInit(): void {
    this.loadDays();
  }

  private loadDays(): void {
    this.days = getDaysInMonth(this.currentMonth, this.currentYear);
  }

  onMonthChanged(newMonth: number): void {
    this.currentMonth = newMonth;
    this.loadDays();
  }

  onAssignmentChanged(event: {
    missionId: number;
    date: string;
    agentId: number;
    assigned: boolean;
  }): void {
    this.timesheetsFacade.saveTimesheets({
      id: `${event.missionId}-${event.date}`,
      missionId: event.missionId,
      date: event.date,
      agentId: event.assigned ? event.agentId : null,
    });
  }

  toggleDarkMode() {
    document.documentElement.classList.toggle('dark');
  }
}
