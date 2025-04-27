import { Action } from '@ngrx/store';

import * as TowersActions from './towers.actions';
import { TowersEntity } from './towers.models';
import {
  TowersState,
  initialTowersState,
  towersReducer,
} from './towers.reducer';

describe('Towers Reducer', () => {
  const createTowersEntity = (id: string, name = ''): TowersEntity => ({
    id,
    name: name || `name-${id}`,
  });

  describe('valid Towers actions', () => {
    it('loadTowersSuccess should return the list of known Towers', () => {
      const towers = [
        createTowersEntity('PRODUCT-AAA'),
        createTowersEntity('PRODUCT-zzz'),
      ];
      const action = TowersActions.loadTowersSuccess({ towers });

      const result: TowersState = towersReducer(initialTowersState, action);

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as Action;

      const result = towersReducer(initialTowersState, action);

      expect(result).toBe(initialTowersState);
    });
  });
});
