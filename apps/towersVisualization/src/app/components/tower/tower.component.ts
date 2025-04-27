import { Component, OnInit } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { TowersFacade } from '../../+state/towers.facade';
import { FormsModule } from '@angular/forms';
import { SlotComponent } from '../slot/slot.component';

@Component({
  selector: 'app-tower',
  imports: [CommonModule, AsyncPipe, FormsModule, SlotComponent],
  templateUrl: './tower.component.html',
  styleUrl: './tower.component.scss',
})
export class TowerComponent implements OnInit{
  towers$ = this.towerFacade.towers$;
  selectedTower$ = this.towerFacade.selectedTower$;
  error$ = this.towerFacade.error$;
  loading$ = this.towerFacade.loading$;

  constructor(private readonly towerFacade: TowersFacade) {}

  ngOnInit(): void {
    this.fetchTowers();
  }

  fetchTowers(): void {
    this.towerFacade.fetchTowers();
  }

  retryFetchTowers(): void {
    this.fetchTowers();
  }

  onSelectTower(towerNumber: number): void {
    this.towerFacade.selectTower(towerNumber);
  }
}
