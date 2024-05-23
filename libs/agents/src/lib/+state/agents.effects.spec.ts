import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';

import { AgentsActions } from './agents.actions';
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
      actions = hot('-a-|', { a: AgentsActions.loadAgents() });

      const expected = hot('-a-|', {
        a: AgentsActions.loadAgentsSuccess({
          agents: [
            { id: 1, name: 'Deder', availableVacations: 7 },
            { id: 2, name: 'Gecko', availableVacations: 7 },
            { id: 3, name: 'Valkyrie', availableVacations: 7 },
          ],
        }),
      });

      expect(effects.loadAgents$).toBeObservable(expected);
    });
  });
});
