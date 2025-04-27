import { createAction, props } from '@ngrx/store';
import { Tower } from '../simulation/tower';


export const FETCH_TOWERS_ACTION = '[Towers] Fetch Towers';
export const FETCH_TOWERS_SUCCESS_ACTION = '[Towers] Fetch Towers Success';
export const FETCH_TOWERS_FAILURE_ACTION = '[Towers] Fetch Towers Failure';
export const SELECT_TOWER_ACTION = '[Towers] Select Tower';

export const fetchTowers = createAction(FETCH_TOWERS_ACTION);

export const fetchTowersSuccess = createAction(
  FETCH_TOWERS_SUCCESS_ACTION,
  props<{ towers: Tower[] }>()
);

export const fetchTowersFailure = createAction(
  FETCH_TOWERS_FAILURE_ACTION,
  props<{ error: string }>()
);

export const selectTower = createAction(
  SELECT_TOWER_ACTION,
  props<{ towerNumber: number }>()
);