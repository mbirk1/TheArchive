import { Component, inject } from '@angular/core';
import { CardService } from '../../services/cards/card.service';

@Component({
  imports: [],
  selector: 'app-all-cards',
  templateUrl: './all-cards.component.html',
  standalone: true,
})
export class AllCardsComponent {
  public cardService: CardService = inject(CardService);
  protected readonly cards = this.cardService.getAllCards();
}
