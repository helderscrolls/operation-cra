import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';

import { MissionsActions } from './missions.actions';
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
      actions = hot('-a-|', { a: MissionsActions.loadMissions() });

      const expected = hot('-a-|', {
        a: MissionsActions.loadMissionsSuccess({
          missions: [
            { id: 1, topSecretMissionName: '006: Save The Nyan Cat' },
            {
              id: 2,
              topSecretMissionName: '009: The King of Zumba',
            },
            {
              id: 3,
              topSecretMissionName: '007: From Wish',
            },
          ],
        }),
      });

      expect(effects.loadMissions$).toBeObservable(expected);
    });
  });
});
