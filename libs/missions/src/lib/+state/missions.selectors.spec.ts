import {
  MissionsPartialState,
  initialMissionsState,
  missionsAdapter,
} from './missions.feature';
import { MissionsEntity } from './missions.models';
import * as MissionsSelectors from './missions.selectors';

describe('Missions Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getMissionsId = (it: MissionsEntity) => it.id;
  const createMissionsEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as MissionsEntity);

  let state: MissionsPartialState;

  beforeEach(() => {
    state = {
      missions: missionsAdapter.setAll(
        [
          createMissionsEntity('PRODUCT-AAA'),
          createMissionsEntity('PRODUCT-BBB'),
          createMissionsEntity('PRODUCT-CCC'),
        ],
        {
          ...initialMissionsState,
          selectedId: 'PRODUCT-BBB',
          error: ERROR_MSG,
          loaded: true,
        }
      ),
    };
  });

  describe('Missions Selectors', () => {
    it('selectAllMissions() should return the list of Missions', () => {
      const results = MissionsSelectors.selectAllMissions(state);
      const selId = getMissionsId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('selectEntity() should return the selected Entity', () => {
      const result = MissionsSelectors.selectEntity(state) as MissionsEntity;
      const selId = getMissionsId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it('selectMissionsLoaded() should return the current "loaded" status', () => {
      const result = MissionsSelectors.selectMissionsLoaded(state);

      expect(result).toBe(true);
    });

    it('selectMissionsError() should return the current "error" state', () => {
      const result = MissionsSelectors.selectMissionsError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
