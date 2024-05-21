import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';

import * as MissionsActions from './missions.actions';
import { MissionsEffects } from './missions.effects';

describe('MissionsEffects', () => {
  let actions: Observable<Action>;
  let effects: MissionsEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        MissionsEffects,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.inject(MissionsEffects);
  });

  describe('init$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: MissionsActions.initMissions() });

      const expected = hot('-a-|', {
        a: MissionsActions.loadMissionsSuccess({ missions: [] }),
      });

      expect(effects.init$).toBeObservable(expected);
    });
  });
});
