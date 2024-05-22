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
    on(TimesheetsActions.addTimesheet, (state, { timesheet }) => {
      const existingTimesheet = state.entities[timesheet.id];

      let updatedTimesheet: TimesheetsEntity;
      if (existingTimesheet) {
        updatedTimesheet = {
          ...existingTimesheet,
          agentIds: [
            ...new Set([...existingTimesheet.agentIds, ...timesheet.agentIds]),
          ],
        };
      } else {
        updatedTimesheet = timesheet;
      }

      return timesheetsAdapter.upsertOne(updatedTimesheet, state);
    }),
    on(TimesheetsActions.removeTimesheet, (state, { timesheet }) => {
      const existingTimesheet = state.entities[timesheet.id];

      if (!existingTimesheet) return state;

      const updatedAgentIds = existingTimesheet.agentIds.filter(
        (id) => !timesheet.agentIds.includes(id)
      );
      const updatedTimesheet: TimesheetsEntity = {
        ...existingTimesheet,
        agentIds: updatedAgentIds,
      };

      if (updatedAgentIds.length === 0) {
        return timesheetsAdapter.removeOne(timesheet.id, state);
      }

      return timesheetsAdapter.upsertOne(updatedTimesheet, state);
    }),
    on(TimesheetsActions.loadTimesheetsSuccess, (state, { timesheets }) => {
      return timesheetsAdapter.setAll(timesheets, {
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
