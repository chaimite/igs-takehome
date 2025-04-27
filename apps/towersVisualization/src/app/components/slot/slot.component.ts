import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Slot } from '../../simulation/slot';

@Component({
  selector: 'app-slot',
  imports: [],
  templateUrl: './slot.component.html',
  styleUrl: './slot.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SlotComponent {
  @Input() slot: Slot | null = null;
}
