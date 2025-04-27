import { Injectable, inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { switchMap, catchError, of } from 'rxjs';
import * as TowersActions from './towers.actions';
import * as TowersFeature from './towers.reducer';

@Injectable()
export class TowersEffects {
  private actions$ = inject(Actions);

  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TowersActions.initTowers),
      switchMap(() => of(TowersActions.loadTowersSuccess({ towers: [] }))),
      catchError((error) => {
        console.error('Error', error);
        return of(TowersActions.loadTowersFailure({ error }));
      })
    )
  );
}
