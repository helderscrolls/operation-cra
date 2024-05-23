import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { EffectsModule } from '@ngrx/effects';
import { Store, StoreModule } from '@ngrx/store';

import { firstValueFrom } from 'rxjs';
import { MissionsActions } from './missions.actions';
import { MissionsEffects } from './missions.effects';
import { MissionsFacade } from './missions.facade';
import { MissionsFeature } from './missions.feature';
import { MissionsEntity } from './missions.models';

describe('MissionsFacade', () => {
  let facade: MissionsFacade;
  let store: Store;
  const createMissionsEntity = (
    id: string | number,
    topSecretMissionName: string
  ): MissionsEntity => ({
    id,
    topSecretMissionName: topSecretMissionName || `name-${id}`,
  });

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(MissionsFeature),
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
    it('loadAll() should return empty list with loaded == false', async () => {
      let list = await firstValueFrom(facade.allMissions$);
      let isLoaded = await firstValueFrom(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(false);

      list = await firstValueFrom(facade.allMissions$);
      isLoaded = await firstValueFrom(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(false);
    });

    /**
     * Use `loadMissionsSuccess` to manually update list
     */
    it('allMissions$ should return the loaded list; and loaded flag == true', async () => {
      let list = await firstValueFrom(facade.allMissions$);
      let isLoaded = await firstValueFrom(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(false);

      store.dispatch(
        MissionsActions.loadMissionsSuccess({
          missions: [
            createMissionsEntity(1, '069: Save Agent Malibou'),
            createMissionsEntity(2, '420: The Green Magic'),
          ],
        })
      );

      list = await firstValueFrom(facade.allMissions$);
      isLoaded = await firstValueFrom(facade.loaded$);

      expect(list.length).toBe(2);
      expect(isLoaded).toBe(true);
    });
  });
});
