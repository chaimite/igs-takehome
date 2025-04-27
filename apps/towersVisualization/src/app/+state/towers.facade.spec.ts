import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';
import { readFirst } from '@nx/angular/testing';

import * as TowersActions from './towers.actions';
import { TowersEffects } from './towers.effects';
import { TowersFacade } from './towers.facade';
import { TowersEntity } from './towers.models';
import {
  TOWERS_FEATURE_KEY,
  TowersState,
  initialTowersState,
  towersReducer,
} from './towers.reducer';
import * as TowersSelectors from './towers.selectors';

interface TestSchema {
  towers: TowersState;
}

describe('TowersFacade', () => {
  let facade: TowersFacade;
  let store: Store<TestSchema>;
  const createTowersEntity = (id: string, name = ''): TowersEntity => ({
    id,
    name: name || `name-${id}`,
  });

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(TOWERS_FEATURE_KEY, towersReducer),
          EffectsModule.forFeature([TowersEffects]),
        ],
        providers: [TowersFacade],
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
      facade = TestBed.inject(TowersFacade);
    });

    /**
     * The initially generated facade::loadAll() returns empty array
     */
    it('loadAll() should return empty list with loaded == true', async () => {
      let list = await readFirst(facade.allTowers$);
      let isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(false);

      facade.init();

      list = await readFirst(facade.allTowers$);
      isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(true);
    });

    /**
     * Use `loadTowersSuccess` to manually update list
     */
    it('allTowers$ should return the loaded list; and loaded flag == true', async () => {
      let list = await readFirst(facade.allTowers$);
      let isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(false);

      store.dispatch(
        TowersActions.loadTowersSuccess({
          towers: [createTowersEntity('AAA'), createTowersEntity('BBB')],
        })
      );

      list = await readFirst(facade.allTowers$);
      isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(2);
      expect(isLoaded).toBe(true);
    });
  });
});
