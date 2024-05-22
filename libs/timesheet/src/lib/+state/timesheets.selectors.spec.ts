import {
  TimesheetsPartialState,
  initialTimesheetsState,
  timesheetsAdapter,
} from './timesheets.feature';
import { TimesheetsEntity } from './timesheets.models';
import * as TimesheetsSelectors from './timesheets.selectors';

describe('Timesheets Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getTimesheetsId = (it: TimesheetsEntity) => it.id;
  const createTimesheetsEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as TimesheetsEntity);

  let state: TimesheetsPartialState;

  beforeEach(() => {
    state = {
      timesheets: timesheetsAdapter.setAll(
        [
          createTimesheetsEntity('PRODUCT-AAA'),
          createTimesheetsEntity('PRODUCT-BBB'),
          createTimesheetsEntity('PRODUCT-CCC'),
        ],
        {
          ...initialTimesheetsState,
          selectedId: 'PRODUCT-BBB',
          error: ERROR_MSG,
          loaded: true,
        }
      ),
    };
  });

  describe('Timesheets Selectors', () => {
    it('selectAllTimesheets() should return the list of Timesheets', () => {
      const results = TimesheetsSelectors.selectAllTimesheets(state);
      const selId = getTimesheetsId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('selectEntity() should return the selected Entity', () => {
      const result = TimesheetsSelectors.selectEntity(
        state
      ) as TimesheetsEntity;
      const selId = getTimesheetsId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it('selectTimesheetsLoaded() should return the current "loaded" status', () => {
      const result = TimesheetsSelectors.selectTimesheetsLoaded(state);

      expect(result).toBe(true);
    });

    it('selectTimesheetsError() should return the current "error" state', () => {
      const result = TimesheetsSelectors.selectTimesheetsError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
