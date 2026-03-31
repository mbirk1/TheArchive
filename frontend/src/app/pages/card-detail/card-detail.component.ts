import { Component, inject } from '@angular/core';
import { CardService } from '../../services/cards/card.service';

@Component({
  imports: [],
  selector: 'app-card-detail',
  templateUrl: './card-detail.component.html',
  standalone: true,
})
export class CardDetailComponent {
  private cardService: CardService = inject(CardService);
  protected cardDetails = this.cardService.findCardById('1');

  constructor() {
    console.log(this.cardDetails);
  }
}
