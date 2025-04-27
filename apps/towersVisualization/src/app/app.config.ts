import {
  ApplicationConfig,
  provideZoneChangeDetection,
  isDevMode,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideStore, provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import * as fromTowers from './+state/towers.reducer';
import { TowersEffects } from './+state/towers.effects';
import { TowersFacade } from './+state/towers.facade';

export const appConfig: ApplicationConfig = {
  providers: [
    provideEffects(TowersEffects),
    provideState(fromTowers.TOWERS_FEATURE_KEY, fromTowers.towersReducer),
    TowersFacade,
    provideStore(),
    provideStoreDevtools({ logOnly: !isDevMode() }),
    provideEffects(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes),
  ],
};
