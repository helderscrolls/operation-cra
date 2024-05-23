import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { EffectsModule } from '@ngrx/effects';
import { Store, StoreModule } from '@ngrx/store';

import { firstValueFrom } from 'rxjs';
import { AgentsActions } from './agents.actions';
import { AgentsEffects } from './agents.effects';
import { AgentsFacade } from './agents.facade';
import { AgentsFeature } from './agents.feature';
import { AgentsEntity } from './agents.models';

describe('AgentsFacade', () => {
  let facade: AgentsFacade;
  let store: Store;
  const createAgentsEntity = (
    id: string | number,
    name: string,
    availableVacations: number
  ): AgentsEntity => ({
    id,
    name: name || `name-${id}`,
    availableVacations: availableVacations || 69,
  });

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(AgentsFeature),
          EffectsModule.forFeature([AgentsEffects]),
        ],
        providers: [AgentsFacade],
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
      facade = TestBed.inject(AgentsFacade);
    });

    /**
     * The initially generated facade::loadAll() returns empty array
     */
    it('loadAll() should return empty list with loaded == false', async () => {
      let list = await firstValueFrom(facade.allAgents$);
      let isLoaded = await firstValueFrom(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(false);

      list = await firstValueFrom(facade.allAgents$);
      isLoaded = await firstValueFrom(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(false);
    });

    /**
     * Use `loadAgentsSuccess` to manually update list
     */
    it('allAgents$ should return the loaded list; and loaded flag == true', async () => {
      let list = await firstValueFrom(facade.allAgents$);
      let isLoaded = await firstValueFrom(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(false);

      store.dispatch(
        AgentsActions.loadAgentsSuccess({
          agents: [
            createAgentsEntity('1', 'Janette Bond', 666),
            createAgentsEntity('2', 'John Bond', 420),
          ],
        })
      );

      list = await firstValueFrom(facade.allAgents$);
      isLoaded = await firstValueFrom(facade.loaded$);

      expect(list.length).toBe(2);
      expect(isLoaded).toBe(true);
    });
  });
});
