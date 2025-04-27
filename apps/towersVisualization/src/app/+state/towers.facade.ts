import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectAllTowers, selectCurrentTower, selectError, selectLoading } from './towers.selectors';
import { fetchTowers, fetchTowersFailure, fetchTowersSuccess, selectTower } from './towers.actions';
import { Tower } from '../simulation/tower';

@Injectable({
  providedIn: 'root',
})
export class TowersFacade {
    towers$ = this.store.select(selectAllTowers);
    selectedTower$ = this.store.select(selectCurrentTower);
    error$ = this.store.select(selectError);
    loading$ = this.store.select(selectLoading);
    
    constructor(private store: Store) {}
    fetchTowers(): void {
        this.store.dispatch(fetchTowers());
      }
    
    fetchTowersSuccess(towers: Tower[]): void {
        this.store.dispatch(fetchTowersSuccess({ towers }));
    }
    
    selectTower(towerNumber: number): void {
        this.store.dispatch(selectTower({ towerNumber }));
    }

    fetchTowersFailure(error: string): void {
        this.store.dispatch(fetchTowersFailure({ error }));
      }
}