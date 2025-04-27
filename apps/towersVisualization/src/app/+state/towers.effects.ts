import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { switchMap, catchError, of, map } from 'rxjs';
import * as TowersActions from './towers.actions';
import { TowerService } from '../simulation/tower.service';
import { Tower } from '../simulation/tower';

@Injectable()
export class TowersEffects {
  constructor(private towerService: TowerService,  private actions$: Actions,) {}

  init$ = createEffect(() =>
    
    this.actions$.pipe(
      ofType(TowersActions.fetchTowers),
      switchMap(() =>
        this.towerService.towerData$.pipe(
          map((towers: Tower[]) => {
            return TowersActions.fetchTowersSuccess({ towers });
          }),
          catchError((error) => {
            return of(TowersActions.fetchTowersFailure({ error: error.message }));
          })
        )
      )
    )
  );
}
