import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  TOWERS_FEATURE_KEY,
  TowersState,
  towersAdapter,
} from './towers.reducer';

// Lookup the 'Towers' feature state managed by NgRx
export const selectTowersState =
  createFeatureSelector<TowersState>(TOWERS_FEATURE_KEY);

const { selectAll, selectEntities } = towersAdapter.getSelectors();

export const selectTowersLoaded = createSelector(
  selectTowersState,
  (state: TowersState) => state.loaded
);

export const selectTowersError = createSelector(
  selectTowersState,
  (state: TowersState) => state.error
);

export const selectAllTowers = createSelector(
  selectTowersState,
  (state: TowersState) => selectAll(state)
);

export const selectTowersEntities = createSelector(
  selectTowersState,
  (state: TowersState) => selectEntities(state)
);

export const selectSelectedId = createSelector(
  selectTowersState,
  (state: TowersState) => state.selectedId
);

export const selectEntity = createSelector(
  selectTowersEntities,
  selectSelectedId,
  (entities, selectedId) => (selectedId ? entities[selectedId] : undefined)
);
