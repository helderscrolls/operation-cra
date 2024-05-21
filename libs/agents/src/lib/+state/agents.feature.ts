import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity';
import { createFeature, createReducer, createSelector, on } from '@ngrx/store';

import { AgentsActions } from './agents.actions';
import { AgentsEntity } from './agents.models';

export const AGENTS_FEATURE_KEY = 'agents';

interface AgentsState extends EntityState<AgentsEntity> {
  selectedId?: string | number; // which Agents record has been selected
  loaded: boolean; // has the Agents list been loaded
  error?: string | null; // last known error (if any)
}

const agentsAdapter: EntityAdapter<AgentsEntity> =
  createEntityAdapter<AgentsEntity>();

const initialAgentsState = agentsAdapter.getInitialState({
  // set initial required properties
  loaded: false,
});

export const AgentsFeature = createFeature({
  name: AGENTS_FEATURE_KEY,
  reducer: createReducer(
    initialAgentsState,
    on(AgentsActions.loadAgents, (state) => ({
      ...state,
      loaded: false,
      error: null,
    })),
    on(AgentsActions.loadAgentsSuccess, (state, { agents }) =>
      agentsAdapter.setAll(agents, { ...state, loaded: true })
    ),
    on(AgentsActions.loadAgentsFailure, (state, { error }) => ({
      ...state,
      error,
    })),
    on(AgentsActions.selectId, (state, { selectedId }) => ({
      ...state,
      selectedId,
    }))
  ),
  extraSelectors({ selectAgentsState }) {
    const { selectAll, selectEntities } =
      agentsAdapter.getSelectors(selectAgentsState);
    const selectSelectedId = createSelector(
      selectAgentsState,
      (state: AgentsState) => state.selectedId
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
