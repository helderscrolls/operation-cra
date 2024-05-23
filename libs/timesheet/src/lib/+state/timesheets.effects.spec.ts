import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { cold, hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';

import { TimesheetsActions } from './timesheets.actions';
import { TimesheetsEffects } from './timesheets.effects';
import { TimesheetsEntity } from './timesheets.models';

Object.defineProperty(window, 'localStorage', {
  value: { setItem: () => undefined, getItem: () => undefined },
});

describe('TimesheetsEffects', () => {
  let actions: Observable<Action>;
  let effects: TimesheetsEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TimesheetsEffects,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.inject(TimesheetsEffects);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('loadTimesheets$', () => {
    it('should return loadTimesheetsSuccess action with timesheets from localStorage', () => {
      const timesheets: TimesheetsEntity[] = [
        { id: '1', missionId: 1, date: '2022-01-01', agentId: 1 },
      ];
      jest
        .spyOn(localStorage, 'getItem')
        .mockReturnValue(JSON.stringify(timesheets));

      actions = hot('-a-|', { a: TimesheetsActions.loadTimesheets });

      const expected = hot('-a-|', {
        a: TimesheetsActions.loadTimesheetsSuccess({ timesheets }),
      });

      expect(effects.loadTimesheets$).toBeObservable(expected);
    });

    it('should return loadTimesheetsSuccess action with empty array when no timesheets in localStorage', () => {
      jest.spyOn(localStorage, 'getItem').mockReturnValue(null);

      actions = hot('-a-|', { a: TimesheetsActions.loadTimesheets });

      const expected = hot('-a-|', {
        a: TimesheetsActions.loadTimesheetsSuccess({ timesheets: [] }),
      });

      expect(effects.loadTimesheets$).toBeObservable(expected);
    });

    it('should return loadTimesheetsFailure action when there is an error', () => {
      const error = new Error('Error loading timesheets');
      jest.spyOn(localStorage, 'getItem').mockImplementation(() => {
        throw error;
      });

      actions = hot('-(a|)', { a: TimesheetsActions.loadTimesheets });

      const expected = hot('-(a|)', {
        a: TimesheetsActions.loadTimesheetsFailure({ error }),
      });

      expect(effects.loadTimesheets$).toBeObservable(expected);
    });
  });

  describe('saveTimesheets$', () => {
    it('should save timesheet to localStorage', fakeAsync(() => {
      const timesheet: TimesheetsEntity = {
        id: '1',
        missionId: 1,
        date: '2022-01-01',
        agentId: 1,
      };

      jest.spyOn(localStorage, 'getItem').mockReturnValue(JSON.stringify([]));
      const setItemSpy = jest.spyOn(localStorage, 'setItem');

      actions = hot('-a-', {
        a: TimesheetsActions.addTimesheet({ timesheet }),
      });

      const expected = cold('-a-', {
        a: TimesheetsActions.addTimesheet({ timesheet }),
      });

      expect(effects.saveTimesheets$).toBeObservable(expected);

      tick();

      const expectedTimesheets = [timesheet];
      expect(setItemSpy).toHaveBeenCalledWith(
        'timesheets',
        JSON.stringify(expectedTimesheets)
      );
    }));

    it('should update existing timesheet in localStorage', fakeAsync(() => {
      const timesheet: TimesheetsEntity = {
        id: '1',
        missionId: 1,
        date: '2022-01-01',
        agentId: 1,
      };
      const existingTimesheet: TimesheetsEntity = {
        id: '1',
        missionId: 1,
        date: '2022-01-01',
        agentId: 2,
      };

      jest
        .spyOn(localStorage, 'getItem')
        .mockReturnValue(JSON.stringify([existingTimesheet]));
      const setItemSpy = jest.spyOn(localStorage, 'setItem');

      actions = hot('-a-', {
        a: TimesheetsActions.addTimesheet({ timesheet }),
      });

      const expected = cold('-a-', {
        a: TimesheetsActions.addTimesheet({ timesheet }),
      });

      expect(effects.saveTimesheets$).toBeObservable(expected);

      tick();

      const expectedTimesheets = [timesheet];
      expect(setItemSpy).toHaveBeenCalledWith(
        'timesheets',
        JSON.stringify(expectedTimesheets)
      );
    }));
    it('should add new timesheet to localStorage if it does not exist', fakeAsync(() => {
      const timesheet: TimesheetsEntity = {
        id: '2',
        missionId: 1,
        date: '2022-01-02',
        agentId: 1,
      };
      const existingTimesheet: TimesheetsEntity = {
        id: '1',
        missionId: 1,
        date: '2022-01-01',
        agentId: 2,
      };

      jest
        .spyOn(localStorage, 'getItem')
        .mockReturnValue(JSON.stringify([existingTimesheet]));
      const setItemSpy = jest.spyOn(localStorage, 'setItem');

      actions = hot('-a-', {
        a: TimesheetsActions.addTimesheet({ timesheet }),
      });

      const expected = cold('-a-', {
        a: TimesheetsActions.addTimesheet({ timesheet }),
      });

      expect(effects.saveTimesheets$).toBeObservable(expected);

      tick();

      const expectedTimesheets = [existingTimesheet, timesheet];
      expect(setItemSpy).toHaveBeenCalledWith(
        'timesheets',
        JSON.stringify(expectedTimesheets)
      );
    }));
  });
});
