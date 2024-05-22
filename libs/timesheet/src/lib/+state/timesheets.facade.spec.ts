import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { EffectsModule } from '@ngrx/effects';
import { Store, StoreModule } from '@ngrx/store';
import { readFirst } from '@nx/angular/testing';

import * as TimesheetsActions from './timesheets.actions';
import { TimesheetsEffects } from './timesheets.effects';
import { TimesheetsFacade } from './timesheets.facade';
import {
  TIMESHEETS_FEATURE_KEY,
  TimesheetsState,
  timesheetsReducer,
} from './timesheets.feature';
import { TimesheetsEntity } from './timesheets.models';

interface TestSchema {
  timesheets: TimesheetsState;
}

describe('TimesheetsFacade', () => {
  let facade: TimesheetsFacade;
  let store: Store<TestSchema>;
  const createTimesheetsEntity = (id: string, name = ''): TimesheetsEntity => ({
    id,
    name: name || `name-${id}`,
  });

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(TIMESHEETS_FEATURE_KEY, timesheetsReducer),
          EffectsModule.forFeature([TimesheetsEffects]),
        ],
        providers: [TimesheetsFacade],
      })
      class CustomFeatureModule {}

      @NgModule({
        imports: [
          StoreModule.forRoot({}),
          EffectsModule.forRoot([]),
          CustomFeatureModule,
        ],
      })
      class RootModule {}
      TestBed.configureTestingModule({ imports: [RootModule] });

      store = TestBed.inject(Store);
      facade = TestBed.inject(TimesheetsFacade);
    });

    /**
     * The initially generated facade::loadAll() returns empty array
     */
    it('loadAll() should return empty list with loaded == true', async () => {
      let list = await readFirst(facade.allTimesheets$);
      let isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(false);

      facade.init();

      list = await readFirst(facade.allTimesheets$);
      isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(true);
    });

    /**
     * Use `loadTimesheetsSuccess` to manually update list
     */
    it('allTimesheets$ should return the loaded list; and loaded flag == true', async () => {
      let list = await readFirst(facade.allTimesheets$);
      let isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(false);

      store.dispatch(
        TimesheetsActions.loadTimesheetsSuccess({
          timesheets: [
            createTimesheetsEntity('AAA'),
            createTimesheetsEntity('BBB'),
          ],
        })
      );

      list = await readFirst(facade.allTimesheets$);
      isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(2);
      expect(isLoaded).toBe(true);
    });
  });
});
