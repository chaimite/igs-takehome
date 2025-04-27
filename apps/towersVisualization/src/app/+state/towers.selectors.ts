import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TowerState } from './towers.models';

export const selectTowerState = createFeatureSelector<TowerState>('towers');

export const selectAllTowers = createSelector(
  selectTowerState,
  (state) => state.towers
);

export const selectCurrentTower = createSelector(
  selectTowerState,
  (state) => state.towers[state.selectedTowerIndex]
);

export const selectLoading = createSelector(
  selectTowerState,
  (state) => state.loading
);

export const selectError = createSelector(
  selectTowerState,
  (state) => state.error
);