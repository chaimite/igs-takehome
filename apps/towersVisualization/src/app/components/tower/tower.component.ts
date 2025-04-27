import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TowersFacade } from '../../+state/towers.facade';

@Component({
  selector: 'app-tower',
  imports: [CommonModule],
  templateUrl: './tower.component.html',
  styleUrl: './tower.component.scss',
})
export class TowerComponent {

  constructor(private readonly towerFacade: TowersFacade) {}
  towers$ = this.towerFacade.allTowers$;
}
