import { createAction, props } from '@ngrx/store';
import { TowersEntity } from './towers.models';

export const initTowers = createAction('[Towers Page] Init');

export const loadTowersSuccess = createAction(
  '[Towers/API] Load Towers Success',
  props<{ towers: TowersEntity[] }>()
);

export const loadTowersFailure = createAction(
  '[Towers/API] Load Towers Failure',
  props<{ error: any }>()
);
