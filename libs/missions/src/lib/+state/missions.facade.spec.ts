import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { EffectsModule } from '@ngrx/effects';
import { Store, StoreModule } from '@ngrx/store';
import { readFirst } from '@nx/angular/testing';

import * as MissionsActions from './missions.actions';
import { MissionsEffects } from './missions.effects';
import { MissionsFacade } from './missions.facade';
import {
  MISSIONS_FEATURE_KEY,
  MissionsState,
  missionsReducer,
} from './missions.feature';
import { MissionsEntity } from './missions.models';

interface TestSchema {
  missions: MissionsState;
}

describe('MissionsFacade', () => {
  let facade: MissionsFacade;
  let store: Store<TestSchema>;
  const createMissionsEntity = (id: string, name = ''): MissionsEntity => ({
    id,
    name: name || `name-${id}`,
  });

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(MISSIONS_FEATURE_KEY, missionsReducer),
          EffectsModule.forFeature([MissionsEffects]),
        ],
        providers: [MissionsFacade],
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
      facade = TestBed.inject(MissionsFacade);
    });

    /**
     * The initially generated facade::loadAll() returns empty array
     */
    it('loadAll() should return empty list with loaded == true', async () => {
      let list = await readFirst(facade.allMissions$);
      let isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(false);

      facade.init();

      list = await readFirst(facade.allMissions$);
      isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(true);
    });

    /**
     * Use `loadMissionsSuccess` to manually update list
     */
    it('allMissions$ should return the loaded list; and loaded flag == true', async () => {
      let list = await readFirst(facade.allMissions$);
      let isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(false);

      store.dispatch(
        MissionsActions.loadMissionsSuccess({
          missions: [createMissionsEntity('AAA'), createMissionsEntity('BBB')],
        })
      );

      list = await readFirst(facade.allMissions$);
      isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(2);
      expect(isLoaded).toBe(true);
    });
  });
});
