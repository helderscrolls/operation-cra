// import { createFeatureSelector, createSelector } from '@ngrx/store';
// import {
//   AGENTS_FEATURE_KEY,
//   AgentsState,
//   agentsAdapter,
// } from './agents.reducer';

// // Lookup the 'Agents' feature state managed by NgRx
// export const selectAgentsState =
//   createFeatureSelector<AgentsState>(AGENTS_FEATURE_KEY);

// const { selectAll, selectEntities } = agentsAdapter.getSelectors();

// export const selectAgentsLoaded = createSelector(
//   selectAgentsState,
//   (state: AgentsState) => state.loaded
// );

// export const selectAgentsError = createSelector(
//   selectAgentsState,
//   (state: AgentsState) => state.error
// );

// export const selectAllAgents = createSelector(
//   selectAgentsState,
//   (state: AgentsState) => selectAll(state)
// );

// export const selectAgentsEntities = createSelector(
//   selectAgentsState,
//   (state: AgentsState) => selectEntities(state)
// );

// export const selectSelectedId = createSelector(
//   selectAgentsState,
//   (state: AgentsState) => state.selectedId
// );

// export const selectEntity = createSelector(
//   selectAgentsEntities,
//   selectSelectedId,
//   (entities, selectedId) => (selectedId ? entities[selectedId] : undefined)
// );
