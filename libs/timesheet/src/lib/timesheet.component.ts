import { Component, OnInit, inject } from '@angular/core';
import { AgentsEntity, AgentsFacade } from '@operation-cra/agents';
import { MissionsEntity, MissionsFacade } from '@operation-cra/missions';
import { Observable } from 'rxjs';
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

  missions$: Observable<MissionsEntity[]> = this.missionsFacade.allMissions$;
  agents$: Observable<AgentsEntity[]> = this.agentsFacade.allAgents$;

  currentMonth = new Date().getMonth();
  currentYear = new Date().getFullYear();
  days: Date[] = [];

  assignments: { [key: string]: number[] } = {}; // key is missionId-date, value is array of agentIds

  ngOnInit(): void {
    this.loadDays();
  }

  loadDays(): void {
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
    console.log('Grid updated', event);
  }
}
