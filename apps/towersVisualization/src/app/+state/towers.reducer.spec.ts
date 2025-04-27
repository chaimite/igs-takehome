import { towersReducer, initialState } from './towers.reducer';
import { fetchTowers, fetchTowersSuccess, fetchTowersFailure, selectTower } from './towers.actions';
import { Action } from '@ngrx/store';
import { Tower } from '../simulation/tower';
import { TowerState } from './towers.models';

describe('towersReducer', () => {
  it('should return the initial state when an unknown action is dispatched', () => {
    const action = { type: 'Unknown' } as Action<string>;
    const state = towersReducer(initialState, action);

    expect(state).toBe(initialState);
  });

  it('should set loading to true and clear error on fetchTowers', () => {
    const action = fetchTowers();
    const state = towersReducer(initialState, action);

    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('should update towers and set loading to false on fetchTowersSuccess', () => {
    const mockTowers: Tower[] = [
      { number: 1, slots: [], getGrowthJobs: () => [] },
      { number: 2, slots: [], getGrowthJobs: () => [] },
    ];
    const action = fetchTowersSuccess({ towers: mockTowers });
    const state = towersReducer(initialState, action);

    expect(state.towers).toEqual(mockTowers);
    expect(state.loading).toBe(false);
    expect(state.error).toBeNull();
  });

  it('should set error and loading to false on fetchTowersFailure', () => {
    const error = 'Failed to fetch towers';
    const action = fetchTowersFailure({ error });
    const state = towersReducer(initialState, action);

    expect(state.error).toBe(error);
    expect(state.loading).toBe(false);
  });

  it('should update selectedTowerIndex on selectTower when towerNumber is valid', () => {
    const mockState: TowerState = {
      ...initialState,
      towers: [
        { number: 1, slots: [], getGrowthJobs: () => [] },
        { number: 2, slots: [], getGrowthJobs: () => [] },
      ],
    };
    const action = selectTower({ towerNumber: 2 });
    const state = towersReducer(mockState, action);

    expect(state.selectedTowerIndex).toBe(1); // Index is 1-based, so tower number 2 corresponds to index 1
  });

  it('should not update selectedTowerIndex on selectTower when towerNumber is invalid', () => {
    const mockState: TowerState = {
      ...initialState,
      towers: [
        { number: 1, slots: [], getGrowthJobs: () => [] },
        { number: 2, slots: [], getGrowthJobs: () => [] },
      ],
    };
    const action = selectTower({ towerNumber: 5 }); // Invalid tower number
    const state = towersReducer(mockState, action);

    expect(state.selectedTowerIndex).toBe(0); // Should remain unchanged
  });
});
