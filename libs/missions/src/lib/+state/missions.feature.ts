import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity';
import { createFeature, createReducer, createSelector, on } from '@ngrx/store';

import { MissionsActions } from './missions.actions';
import { MissionsEntity } from './missions.models';

export const MISSIONS_FEATURE_KEY = 'missions';

interface MissionsState extends EntityState<MissionsEntity> {
  selectedId?: string | number; // which Missions record has been selected
  loaded: boolean; // has the Missions list been loaded
  error?: string | null; // last known error (if any)
}

const missionsAdapter: EntityAdapter<MissionsEntity> =
  createEntityAdapter<MissionsEntity>();

export const initialMissionsState = missionsAdapter.getInitialState({
  // set initial required properties
  loaded: false,
});

export const MissionsFeature = createFeature({
  name: MISSIONS_FEATURE_KEY,
  reducer: createReducer(
    initialMissionsState,
    on(MissionsActions.loadMissions, (state) => ({
      ...state,
      loaded: false,
      error: null,
    })),
    on(MissionsActions.loadMissionsSuccess, (state, { missions }) =>
      missionsAdapter.setAll(missions, { ...state, loaded: true })
    ),
    on(MissionsActions.loadMissionsFailure, (state, { error }) => ({
      ...state,
      error,
    })),
    on(MissionsActions.selectId, (state, { selectedId }) => ({
      ...state,
      selectedId,
    }))
  ),
  extraSelectors({ selectMissionsState }) {
    const { selectAll, selectEntities } =
      missionsAdapter.getSelectors(selectMissionsState);
    const selectSelectedId = createSelector(
      selectMissionsState,
      (state: MissionsState) => state.selectedId
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
