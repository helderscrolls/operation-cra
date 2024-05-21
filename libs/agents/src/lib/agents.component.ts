import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { AgentsFacade } from './+state/agents.facade';

@Component({
  selector: 'lib-agents',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './agents.component.html',
  styleUrl: './agents.component.scss',
})
export class AgentsComponent implements OnInit {
  agentsFacade = inject(AgentsFacade);

  ngOnInit(): void {
    this.agentsFacade.init();
  }
}
