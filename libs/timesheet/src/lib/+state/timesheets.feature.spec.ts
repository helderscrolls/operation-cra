import { Action } from '@ngrx/store';

import * as TimesheetsActions from './timesheets.actions';
import {
  TimesheetsState,
  initialTimesheetsState,
  timesheetsReducer,
} from './timesheets.feature';
import { TimesheetsEntity } from './timesheets.models';

describe('Timesheets Reducer', () => {
  const createTimesheetsEntity = (id: string, name = ''): TimesheetsEntity => ({
    id,
    name: name || `name-${id}`,
  });

  describe('valid Timesheets actions', () => {
    it('loadTimesheetsSuccess should return the list of known Timesheets', () => {
      const timesheets = [
        createTimesheetsEntity('PRODUCT-AAA'),
        createTimesheetsEntity('PRODUCT-zzz'),
      ];
      const action = TimesheetsActions.loadTimesheetsSuccess({ timesheets });

      const result: TimesheetsState = timesheetsReducer(
        initialTimesheetsState,
        action
      );

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as Action;

      const result = timesheetsReducer(initialTimesheetsState, action);

      expect(result).toBe(initialTimesheetsState);
    });
  });
});
