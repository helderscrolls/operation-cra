import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';

import * as TimesheetsActions from './timesheets.actions';
import { TimesheetsEffects } from './timesheets.effects';

describe('TimesheetsEffects', () => {
  let actions: Observable<Action>;
  let effects: TimesheetsEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        TimesheetsEffects,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.inject(TimesheetsEffects);
  });

  describe('init$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: TimesheetsActions.initTimesheets() });

      const expected = hot('-a-|', {
        a: TimesheetsActions.loadTimesheetsSuccess({ timesheets: [] }),
      });

      expect(effects.init$).toBeObservable(expected);
    });
  });
});
