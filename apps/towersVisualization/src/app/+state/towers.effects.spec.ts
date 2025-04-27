import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';

import * as TowersActions from './towers.actions';
import { TowersEffects } from './towers.effects';

describe('TowersEffects', () => {
  let actions: Observable<Action>;
  let effects: TowersEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        TowersEffects,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.inject(TowersEffects);
  });

  describe('init$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: TowersActions.initTowers() });

      const expected = hot('-a-|', {
        a: TowersActions.loadTowersSuccess({ towers: [] }),
      });

      expect(effects.init$).toBeObservable(expected);
    });
  });
});
