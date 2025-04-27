import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import * as TowersActions from './towers.actions';
import { TowersEntity } from './towers.models';

export const TOWERS_FEATURE_KEY = 'towers';

export interface TowersState extends EntityState<TowersEntity> {
  selectedId?: string | number; // which Towers record has been selected
  loaded: boolean; // has the Towers list been loaded
  error?: string | null; // last known error (if any)
}

export interface TowersPartialState {
  readonly [TOWERS_FEATURE_KEY]: TowersState;
}

export const towersAdapter: EntityAdapter<TowersEntity> =
  createEntityAdapter<TowersEntity>();

export const initialTowersState: TowersState = towersAdapter.getInitialState({
  // set initial required properties
  loaded: false,
});

const reducer = createReducer(
  initialTowersState,
  on(TowersActions.initTowers, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(TowersActions.loadTowersSuccess, (state, { towers }) =>
    towersAdapter.setAll(towers, { ...state, loaded: true })
  ),
  on(TowersActions.loadTowersFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);

export function towersReducer(state: TowersState | undefined, action: Action) {
  return reducer(state, action);
}
