import { Route } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import { AgentsEffects } from './+state/agents.effects';
import { AgentsFacade } from './+state/agents.facade';
import { AgentsFeature } from './+state/agents.feature';
import { AgentsComponent } from './agents.component';

export const agentsRoutes: Route[] = [
  {
    path: '',
    component: AgentsComponent,
    providers: [
      AgentsFacade,
      provideState(AgentsFeature),
      provideEffects(AgentsEffects),
    ],
  },
];
