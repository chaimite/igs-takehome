import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TowerComponent } from "../components/tower/tower.component";
import { TowersFacade } from '../+state/towers.facade';

@Component({
  imports: [CommonModule, TowerComponent],
  providers: [TowersFacade],
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'app-towersVisualization-entry',
  template: `<app-tower></app-tower>`,
})
export class RemoteEntryComponent {}
