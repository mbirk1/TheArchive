import { Component, inject } from '@angular/core';
import { AllCardsService } from '../../services/cards/all-cards.service';

@Component({
  imports: [],
  selector: 'app-all-cards',
  templateUrl: './all-cards.component.html',
  standalone: true,
})
export class AllCardsComponent {
  public cardService: AllCardsService = inject(AllCardsService);
  protected readonly cards = this.cardService.getAllCards();
}