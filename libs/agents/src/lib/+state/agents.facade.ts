import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';

import { AgentsActions } from './agents.actions';
import { AgentsFeature } from './agents.feature';

@Injectable()
export class AgentsFacade {
  private readonly store = inject(Store);

  /**
   * Combine pieces of state using createSelector,
   * and expose them as observables through the facade.
   */
  loaded$ = this.store.select(AgentsFeature.selectLoaded);
  allAgents$ = this.store.select(AgentsFeature.selectAll);
  selectSelectedAgents$ = this.store.select(AgentsFeature.selectSelected);

  /**
   * Use the initialization action to perform one
   * or more tasks in your Effects.
   */
  init() {
    this.store.dispatch(AgentsActions.loadAgents());
  }
}
