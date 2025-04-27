import { TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { TowersFacade } from './towers.facade';
import { fetchTowersFailure, fetchTowersSuccess, selectTower } from './towers.actions';
import { Tower } from '../simulation/tower';

describe('TowersFacade', () => {
  let facade: TowersFacade;
  let store: MockStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TowersFacade, provideMockStore()],
    });

    facade = TestBed.inject(TowersFacade);
    store = TestBed.inject(MockStore);
    jest.spyOn(store, 'dispatch');
  });

  it('should dispatch fetchTowersSuccess', () => {
    const mockTowers: Tower[] = [{ number: 1, slots: [], getGrowthJobs: () => [] }];
    facade.fetchTowersSuccess(mockTowers);

    expect(store.dispatch).toHaveBeenCalledWith(fetchTowersSuccess({ towers: mockTowers }));
  });

  it('should dispatch selectTower', () => {
    const towerNumber = 1;
    facade.selectTower(towerNumber);

    expect(store.dispatch).toHaveBeenCalledWith(selectTower({ towerNumber }));
  });

  it('should expose towers$ observable', (done) => {
    const mockTowers: Tower[] = [{ number: 1, slots: [], getGrowthJobs: () => [] }];
    store.setState({ towers: { towers: mockTowers, selectedTowerIndex: 0, loading: false, error: null } });

    facade.towers$.subscribe((towers) => {
      expect(towers).toEqual(mockTowers);
      done();
    });
  });

  it('should expose selectedTower$ observable', (done) => {
    const mockTower: Tower = { number: 1, slots: [], getGrowthJobs: () => [] };
    store.setState({ towers: { towers: [mockTower], selectedTowerIndex: 0, loading: false, error: null } });

    facade.selectedTower$.subscribe((selectedTower) => {
      expect(selectedTower).toEqual(mockTower);
      done();
    });
  });

  it('should dispatch fetchTowersFailure', () => {
    const error = 'Failed to fetch towers';
    facade.fetchTowersFailure(error);

    expect(store.dispatch).toHaveBeenCalledWith(fetchTowersFailure({ error }));
  });


  it('should expose error$ observable', (done) => {
    const error = 'Failed to fetch towers';
    store.setState({ towers: { towers: [], selectedTowerIndex: 0, loading: false, error } });

    facade.error$.subscribe((err) => {
      expect(err).toEqual(error);
      done();
    });
  });
});
