import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';

import { MissionsActions } from './missions.actions';
import { MissionsFeature } from './missions.feature';

@Injectable()
export class MissionsFacade {
  private readonly store = inject(Store);

  /**
   * Combine pieces of state using createSelector,
   * and expose them as observables through the facade.
   */
  loaded$ = this.store.select(MissionsFeature.selectLoaded);
  allMissions$ = this.store.select(MissionsFeature.selectAll);
  selectSelectedMissions$ = this.store.select(MissionsFeature.selectSelected);

  /**
   * Use the initialization action to perform one
   * or more tasks in your Effects.
   */
  init() {
    this.store.dispatch(MissionsActions.loadMissions());
  }
}
