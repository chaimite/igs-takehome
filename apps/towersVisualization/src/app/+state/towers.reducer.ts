import { createReducer, on } from '@ngrx/store';
import { fetchTowers, fetchTowersSuccess, fetchTowersFailure, selectTower } from './towers.actions';
import { TowerState } from './towers.models';

export const TOWERS_FEATURE_KEY = 'towers';
export interface TowersPartialState {
    readonly [TOWERS_FEATURE_KEY]: TowerState;
}

export const initialState: TowerState = {
  towers: [],
  selectedTowerIndex: 0,
  loading: false,
  error: null,
};

export const towersReducer = createReducer(
  initialState,
  on(fetchTowers, (state: TowerState): TowerState => ({
    ...state,
    loading: true,
  })),

  on(fetchTowersSuccess, (state: TowerState, { towers }): TowerState => ({
      ...state,
      towers,
      loading: false,
      error: null,
  })),

  on(fetchTowersFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  
  on(selectTower, (state, { towerNumber }) => {
    const index = towerNumber - 1;
    return {
      ...state,
      selectedTowerIndex: index >= 0 && index < state.towers.length ? index : state.selectedTowerIndex,
    };
  })
);