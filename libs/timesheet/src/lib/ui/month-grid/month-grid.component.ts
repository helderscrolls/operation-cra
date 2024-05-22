import { AsyncPipe, DatePipe, NgFor } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AgentsEntity } from '@operation-cra/agents';
import { MissionsEntity } from '@operation-cra/missions';
import { Observable } from 'rxjs';

@Component({
  selector: 'lib-month-grid',
  standalone: true,
  imports: [NgFor, FormsModule, AsyncPipe, DatePipe],
  templateUrl: './month-grid.component.html',
  styleUrl: './month-grid.component.scss',
})
export class MonthGridComponent {
  @Input({ required: true }) days!: Date[];
  @Input({ required: true }) missions$!: Observable<MissionsEntity[]>;
  @Input({ required: true }) agents$!: Observable<AgentsEntity[]>;
  @Output() assignmentChanged = new EventEmitter<{
    missionId: number;
    date: string;
    agentId: number;
    assigned: boolean;
  }>();

  onAgentChange(
    missionId: number,
    date: Date,
    agentId: number,
    event: Event
  ): void {
    console.log('FUCK YOU', date);
    const target = event.target as HTMLInputElement;
    const dateString = date.toLocaleDateString('en-US').split('T')[0];
    this.assignmentChanged.emit({
      missionId,
      date: dateString,
      agentId,
      assigned: target.checked,
    });
  }
}
