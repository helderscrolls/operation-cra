import {
  agentsAdapter,
  AgentsPartialState,
  initialAgentsState,
} from './agents.feature';
import { AgentsEntity } from './agents.models';
import * as AgentsSelectors from './agents.selectors';

describe('Agents Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getAgentsId = (it: AgentsEntity) => it.id;
  const createAgentsEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as AgentsEntity);

  let state: AgentsPartialState;

  beforeEach(() => {
    state = {
      agents: agentsAdapter.setAll(
        [
          createAgentsEntity('PRODUCT-AAA'),
          createAgentsEntity('PRODUCT-BBB'),
          createAgentsEntity('PRODUCT-CCC'),
        ],
        {
          ...initialAgentsState,
          selectedId: 'PRODUCT-BBB',
          error: ERROR_MSG,
          loaded: true,
        }
      ),
    };
  });

  describe('Agents Selectors', () => {
    it('selectAllAgents() should return the list of Agents', () => {
      const results = AgentsSelectors.selectAllAgents(state);
      const selId = getAgentsId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('selectEntity() should return the selected Entity', () => {
      const result = AgentsSelectors.selectEntity(state) as AgentsEntity;
      const selId = getAgentsId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it('selectAgentsLoaded() should return the current "loaded" status', () => {
      const result = AgentsSelectors.selectAgentsLoaded(state);

      expect(result).toBe(true);
    });

    it('selectAgentsError() should return the current "error" state', () => {
      const result = AgentsSelectors.selectAgentsError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
