import { NgModule } from '@angular/core';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import { AgentsEffects } from './+state/agents.effects';
import { AgentsFacade } from './+state/agents.facade';
import { AgentsFeature } from './+state/agents.feature';

@NgModule({
  providers: [
    AgentsFacade,
    provideState(AgentsFeature),
    provideEffects(AgentsEffects),
  ],
})
export class StateAgentsModule {}
