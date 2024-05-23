import { AsyncPipe, DatePipe, NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AgentsEntity } from '@operation-cra/agents';
import { MissionsEntity } from '@operation-cra/missions';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { TimesheetsEntity } from '../../+state/timesheets.models';

@Component({
  selector: 'lib-month-grid',
  standalone: true,
  imports: [NgIf, NgFor, FormsModule, AsyncPipe, DatePipe],
  templateUrl: './month-grid.component.html',
  styleUrls: ['./month-grid.component.scss'],
})
export class MonthGridComponent implements OnInit {
  @Input({ required: true }) days!: Date[];
  @Input({ required: true }) missions$!: Observable<MissionsEntity[]>;
  @Input({ required: true }) agents$!: Observable<AgentsEntity[]>;
  @Input({ required: true }) timesheets$!: Observable<TimesheetsEntity[]>;
  @Output() assignmentChanged = new EventEmitter<{
    missionId: number;
    date: string;
    agentId: number;
    assigned: boolean;
  }>();

  timesheetsMap$: Observable<{ [key: string]: TimesheetsEntity }> = of({});

  ngOnInit(): void {
    this.timesheetsMap$ = this.timesheets$.pipe(
      map((timesheets) =>
        timesheets.reduce((acc, timesheets) => {
          const key = this.getTimesheetKey(
            timesheets.missionId,
            new Date(timesheets.date)
          );
          acc[key] = timesheets;
          return acc;
        }, {} as { [key: string]: TimesheetsEntity })
      )
    );
  }

  getTimesheetKey(missionId: number, date: Date): string {
    return `${missionId}-${date.toLocaleDateString('en-US')}`;
  }

  getAssignedAgent(
    missionId: number,
    date: Date,
    timesheets: { [key: string]: TimesheetsEntity }
  ): number | null {
    const key = this.getTimesheetKey(missionId, date);
    const assignment = timesheets[key];
    return assignment ? assignment.agentId : null;
  }

  onAgentChange(missionId: number, date: Date, event: Event): void {
    const select = event.target as HTMLSelectElement;
    const agentId = select.value ? parseInt(select.value, 10) : null;
    const dateString = date.toLocaleDateString('en-US');
    this.assignmentChanged.emit({
      missionId,
      date: dateString,
      agentId: agentId!,
      assigned: select.value !== null,
    });
  }
}
