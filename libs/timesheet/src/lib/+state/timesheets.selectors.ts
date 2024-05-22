// import { createFeatureSelector, createSelector } from '@ngrx/store';
// import {
//   TIMESHEETS_FEATURE_KEY,
//   TimesheetsState,
//   timesheetsAdapter,
// } from './timesheets.feature';

// // Lookup the 'Timesheets' feature state managed by NgRx
// export const selectTimesheetsState = createFeatureSelector<TimesheetsState>(
//   TIMESHEETS_FEATURE_KEY
// );

// const { selectAll, selectEntities } = timesheetsAdapter.getSelectors();

// export const selectTimesheetsLoaded = createSelector(
//   selectTimesheetsState,
//   (state: TimesheetsState) => state.loaded
// );

// export const selectTimesheetsError = createSelector(
//   selectTimesheetsState,
//   (state: TimesheetsState) => state.error
// );

// export const selectAllTimesheets = createSelector(
//   selectTimesheetsState,
//   (state: TimesheetsState) => selectAll(state)
// );

// export const selectTimesheetsEntities = createSelector(
//   selectTimesheetsState,
//   (state: TimesheetsState) => selectEntities(state)
// );

// export const selectSelectedId = createSelector(
//   selectTimesheetsState,
//   (state: TimesheetsState) => state.selectedId
// );

// export const selectEntity = createSelector(
//   selectTimesheetsEntities,
//   selectSelectedId,
//   (entities, selectedId) => (selectedId ? entities[selectedId] : undefined)
// );
