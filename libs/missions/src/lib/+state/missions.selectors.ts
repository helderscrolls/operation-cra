// import { createFeatureSelector, createSelector } from '@ngrx/store';
// import {
//   MISSIONS_FEATURE_KEY,
//   MissionsState,
//   missionsAdapter,
// } from './missions.feature';

// // Lookup the 'Missions' feature state managed by NgRx
// export const selectMissionsState =
//   createFeatureSelector<MissionsState>(MISSIONS_FEATURE_KEY);

// const { selectAll, selectEntities } = missionsAdapter.getSelectors();

// export const selectMissionsLoaded = createSelector(
//   selectMissionsState,
//   (state: MissionsState) => state.loaded
// );

// export const selectMissionsError = createSelector(
//   selectMissionsState,
//   (state: MissionsState) => state.error
// );

// export const selectAllMissions = createSelector(
//   selectMissionsState,
//   (state: MissionsState) => selectAll(state)
// );

// export const selectMissionsEntities = createSelector(
//   selectMissionsState,
//   (state: MissionsState) => selectEntities(state)
// );

// export const selectSelectedId = createSelector(
//   selectMissionsState,
//   (state: MissionsState) => state.selectedId
// );

// export const selectEntity = createSelector(
//   selectMissionsEntities,
//   selectSelectedId,
//   (entities, selectedId) => (selectedId ? entities[selectedId] : undefined)
// );
