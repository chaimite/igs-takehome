import { Injectable, inject } from '@angular/core';
import { select, Store, Action } from '@ngrx/store';

import * as TowersActions from './towers.actions';
import * as TowersFeature from './towers.reducer';
import * as TowersSelectors from './towers.selectors';

@Injectable()
export class TowersFacade {
  private readonly store = inject(Store);

  /**
   * Combine pieces of state using createSelector,
   * and expose them as observables through the facade.
   */
  loaded$ = this.store.pipe(select(TowersSelectors.selectTowersLoaded));
  allTowers$ = this.store.pipe(select(TowersSelectors.selectAllTowers));
  selectedTowers$ = this.store.pipe(select(TowersSelectors.selectEntity));

  /**
   * Use the initialization action to perform one
   * or more tasks in your Effects.
   */
  init() {
    this.store.dispatch(TowersActions.initTowers());
  }
}
