import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';

import * as AgentsActions from './agents.actions';
import { AgentsEffects } from './agents.effects';

describe('AgentsEffects', () => {
  let actions: Observable<Action>;
  let effects: AgentsEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        AgentsEffects,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.inject(AgentsEffects);
  });

  describe('init$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: AgentsActions.initAgents() });

      const expected = hot('-a-|', {
        a: AgentsActions.loadAgentsSuccess({ agents: [] }),
      });

      expect(effects.init$).toBeObservable(expected);
    });
  });
});
