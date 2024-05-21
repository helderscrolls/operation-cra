import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { EffectsModule } from '@ngrx/effects';
import { Store, StoreModule } from '@ngrx/store';
import { readFirst } from '@nx/angular/testing';

import * as AgentsActions from './agents.actions';
import { AgentsEffects } from './agents.effects';
import { AgentsFacade } from './agents.facade';
import {
  AGENTS_FEATURE_KEY,
  AgentsState,
  agentsReducer,
} from './agents.feature';
import { AgentsEntity } from './agents.models';

interface TestSchema {
  agents: AgentsState;
}

describe('AgentsFacade', () => {
  let facade: AgentsFacade;
  let store: Store<TestSchema>;
  const createAgentsEntity = (id: string, name = ''): AgentsEntity => ({
    id,
    name: name || `name-${id}`,
  });

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(AGENTS_FEATURE_KEY, agentsReducer),
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
    it('loadAll() should return empty list with loaded == true', async () => {
      let list = await readFirst(facade.allAgents$);
      let isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(false);

      facade.init();

      list = await readFirst(facade.allAgents$);
      isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(true);
    });

    /**
     * Use `loadAgentsSuccess` to manually update list
     */
    it('allAgents$ should return the loaded list; and loaded flag == true', async () => {
      let list = await readFirst(facade.allAgents$);
      let isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(false);

      store.dispatch(
        AgentsActions.loadAgentsSuccess({
          agents: [createAgentsEntity('AAA'), createAgentsEntity('BBB')],
        })
      );

      list = await readFirst(facade.allAgents$);
      isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(2);
      expect(isLoaded).toBe(true);
    });
  });
});
