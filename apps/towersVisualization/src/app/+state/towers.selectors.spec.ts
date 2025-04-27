import { TowersEntity } from './towers.models';
import {
  towersAdapter,
  TowersPartialState,
  initialTowersState,
} from './towers.reducer';
import * as TowersSelectors from './towers.selectors';

describe('Towers Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getTowersId = (it: TowersEntity) => it.id;
  const createTowersEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as TowersEntity);

  let state: TowersPartialState;

  beforeEach(() => {
    state = {
      towers: towersAdapter.setAll(
        [
          createTowersEntity('PRODUCT-AAA'),
          createTowersEntity('PRODUCT-BBB'),
          createTowersEntity('PRODUCT-CCC'),
        ],
        {
          ...initialTowersState,
          selectedId: 'PRODUCT-BBB',
          error: ERROR_MSG,
          loaded: true,
        }
      ),
    };
  });

  describe('Towers Selectors', () => {
    it('selectAllTowers() should return the list of Towers', () => {
      const results = TowersSelectors.selectAllTowers(state);
      const selId = getTowersId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('selectEntity() should return the selected Entity', () => {
      const result = TowersSelectors.selectEntity(state) as TowersEntity;
      const selId = getTowersId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it('selectTowersLoaded() should return the current "loaded" status', () => {
      const result = TowersSelectors.selectTowersLoaded(state);

      expect(result).toBe(true);
    });

    it('selectTowersError() should return the current "error" state', () => {
      const result = TowersSelectors.selectTowersError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
