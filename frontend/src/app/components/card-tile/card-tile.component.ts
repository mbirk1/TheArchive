import { Component, input, InputSignal } from '@angular/core';
import { ICard } from 'lib';

@Component({
  imports: [],
  selector: 'app-card-tile',
  templateUrl: './card-tile.component.html',
  standalone: true,
})
export class CardTileComponent {
  card: InputSignal<ICard> = input.required<ICard>();
}
