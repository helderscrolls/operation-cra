import { Component, OnInit, inject } from '@angular/core';
import { AgentsFacade } from '@operation-cra/agents';
import { MissionsFacade } from '@operation-cra/missions';
import { TimesheetComponent, TimesheetsFacade } from '@operation-cra/timesheet';
@Component({
  standalone: true,
  imports: [TimesheetComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  private readonly agentsFacade = inject(AgentsFacade);
  private readonly missionsFacade = inject(MissionsFacade);
  private readonly timesheetsFacade = inject(TimesheetsFacade);
  ngOnInit(): void {
    this.agentsFacade.init();
    this.missionsFacade.init();
    this.timesheetsFacade.init();
  }
}
