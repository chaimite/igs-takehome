import { Tower } from '../simulation/tower';

/**
 * Interface for the 'Towers' data
 */
export interface TowersEntity {
  id: string | number; // Primary ID
  name: string;
}
// import { Tower } from '../../simulation/tower';

export interface TowerState {
  towers: Tower[];
  selectedTowerIndex: number;
  loading: boolean;
  error: string | null;
}
