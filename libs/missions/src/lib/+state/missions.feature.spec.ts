import { Action } from '@ngrx/store';

import * as MissionsActions from './missions.actions';
import {
  MissionsState,
  initialMissionsState,
  missionsReducer,
} from './missions.feature';
import { MissionsEntity } from './missions.models';

describe('Missions Reducer', () => {
  const createMissionsEntity = (id: string, name = ''): MissionsEntity => ({
    id,
    name: name || `name-${id}`,
  });

  describe('valid Missions actions', () => {
    it('loadMissionsSuccess should return the list of known Missions', () => {
      const missions = [
        createMissionsEntity('PRODUCT-AAA'),
        createMissionsEntity('PRODUCT-zzz'),
      ];
      const action = MissionsActions.loadMissionsSuccess({ missions });

      const result: MissionsState = missionsReducer(
        initialMissionsState,
        action
      );

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as Action;

      const result = missionsReducer(initialMissionsState, action);

      expect(result).toBe(initialMissionsState);
    });
  });
});
