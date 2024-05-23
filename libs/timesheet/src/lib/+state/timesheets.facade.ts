import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';

import { TimesheetsActions } from './timesheets.actions';
import { TimesheetsFeature } from './timesheets.feature';
import { TimesheetsEntity } from './timesheets.models';

@Injectable()
export class TimesheetsFacade {
  private readonly store = inject(Store);

  /**
   * Combine pieces of state using createSelector,
   * and expose them as observables through the facade.
   */
  loaded$ = this.store.select(TimesheetsFeature.selectLoaded);
  allTimesheets$ = this.store.select(TimesheetsFeature.selectAll);
  selectedTimesheets$ = this.store.select(TimesheetsFeature.selectSelected);

  /**
   * Use the initialization action to perform one
   * or more tasks in your Effects.
   */
  init() {
    this.store.dispatch(TimesheetsActions.loadTimesheets());
  }

  saveTimesheets(timesheets: TimesheetsEntity) {
    this.store.dispatch(
      TimesheetsActions.addTimesheet({ timesheet: timesheets })
    );
  }
}
