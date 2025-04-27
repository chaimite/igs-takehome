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
import { TowersEffects } from './+state/towers.effects';
import { TowersFacade } from './+state/towers.facade';
import { TOWERS_FEATURE_KEY, towersReducer } from './+state/towers.reducer';
import { TowerService } from './simulation/tower.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideEffects(TowersEffects),
    provideState(TOWERS_FEATURE_KEY, towersReducer),
    TowersFacade,
    provideStore({ towers: towersReducer }),
    provideStoreDevtools({ logOnly: !isDevMode() }),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes),
    TowerService,
  ],
};
