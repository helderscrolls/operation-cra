import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { EffectsModule } from '@ngrx/effects';
import { Store, StoreModule } from '@ngrx/store';

import { firstValueFrom } from 'rxjs';
import { TimesheetsActions } from './timesheets.actions';
import { TimesheetsEffects } from './timesheets.effects';
import { TimesheetsFacade } from './timesheets.facade';
import { TimesheetsFeature } from './timesheets.feature';
import { TimesheetsEntity } from './timesheets.models';

describe('TimesheetsFacade', () => {
  let facade: TimesheetsFacade;
  let store: Store;
  const createTimesheetsEntity = (
    id: string,
    missionId: number,
    date: string,
    agentId: number | null
  ): TimesheetsEntity => ({
    id,
    missionId,
    date,
    agentId,
  });

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(TimesheetsFeature),
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
      let list = await firstValueFrom(facade.allTimesheets$);
      let isLoaded = await firstValueFrom(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(false);

      facade.init();

      list = await firstValueFrom(facade.allTimesheets$);
      isLoaded = await firstValueFrom(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(true);
    });

    /**
     * Use `loadTimesheetsSuccess` to manually update list
     */
    it('allTimesheets$ should return the loaded list; and loaded flag == true', async () => {
      let list = await firstValueFrom(facade.allTimesheets$);
      let isLoaded = await firstValueFrom(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(false);

      store.dispatch(
        TimesheetsActions.loadTimesheetsSuccess({
          timesheets: [
            createTimesheetsEntity('3-5/4/2024', 1, '2024-04-05', 1),
            createTimesheetsEntity('3-6/4/2024', 2, '2025-04-06', 2),
          ],
        })
      );

      list = await firstValueFrom(facade.allTimesheets$);
      isLoaded = await firstValueFrom(facade.loaded$);

      expect(list.length).toBe(2);
      expect(isLoaded).toBe(true);
    });
  });
});
