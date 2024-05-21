import { Action } from '@ngrx/store';

import * as AgentsActions from './agents.actions';
import {
  AgentsState,
  agentsReducer,
  initialAgentsState,
} from './agents.feature';
import { AgentsEntity } from './agents.models';

describe('Agents Reducer', () => {
  const createAgentsEntity = (id: string, name = ''): AgentsEntity => ({
    id,
    name: name || `name-${id}`,
  });

  describe('valid Agents actions', () => {
    it('loadAgentsSuccess should return the list of known Agents', () => {
      const agents = [
        createAgentsEntity('PRODUCT-AAA'),
        createAgentsEntity('PRODUCT-zzz'),
      ];
      const action = AgentsActions.loadAgentsSuccess({ agents });

      const result: AgentsState = agentsReducer(initialAgentsState, action);

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as Action;

      const result = agentsReducer(initialAgentsState, action);

      expect(result).toBe(initialAgentsState);
    });
  });
});
