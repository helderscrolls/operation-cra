import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity';
import { createFeature, createReducer, createSelector, on } from '@ngrx/store';

import { TimesheetsActions } from './timesheets.actions';
import { TimesheetsEntity } from './timesheets.models';

export const TIMESHEETS_FEATURE_KEY = 'timesheets';

interface TimesheetsState extends EntityState<TimesheetsEntity> {
  selectedId?: string | number; // which Timesheets record has been selected
  loaded: boolean; // has the Timesheets list been loaded
  error?: string | null; // last known error (if any)
}

const timesheetsAdapter: EntityAdapter<TimesheetsEntity> =
  createEntityAdapter<TimesheetsEntity>();

const initialTimesheetsState = timesheetsAdapter.getInitialState({
  // set initial required properties
  loaded: false,
});

export const TimesheetsFeature = createFeature({
  name: 'timesheets',
  reducer: createReducer(
    initialTimesheetsState,
    on(TimesheetsActions.addTimesheet, (state, { timesheet }) =>
      timesheetsAdapter.addOne(timesheet, state)
    ),
    on(TimesheetsActions.removeTimesheet, (state, { timesheetId }) =>
      timesheetsAdapter.removeOne(timesheetId, state)
    ),
    on(TimesheetsActions.loadTimesheetsSuccess, (state, { timesheets }) => {
      return timesheetsAdapter.addMany(timesheets, {
        ...state,
        loaded: true,
      });
    }),
    on(TimesheetsActions.loadTimesheetsFailure, (state, { error }) => ({
      ...state,
      error,
    }))
  ),

  extraSelectors({ selectTimesheetsState }) {
    const { selectAll, selectEntities } = timesheetsAdapter.getSelectors(
      selectTimesheetsState
    );
    const selectSelectedId = createSelector(
      selectTimesheetsState,
      (state: TimesheetsState) => state.selectedId
    );
    const selectSelected = createSelector(
      selectEntities,
      selectSelectedId,
      (entities, selectedId) => (selectedId ? entities[selectedId] : undefined)
    );

    return {
      selectAll,
      selectSelectedId,
      selectSelected,
    };
  },
});
