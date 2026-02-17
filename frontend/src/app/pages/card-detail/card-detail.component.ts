import { Component, computed, inject, Signal } from '@angular/core';
import { CardService } from '../../services/cards/card.service';
import { ICard } from 'lib';
import { firstValueFrom, Observable } from 'rxjs';

@Component({
  imports: [],
  selector: 'app-card-detail',
  templateUrl: './card-detail.component.html',
  standalone: true,
})
export class CardDetailComponent {
  private cardService: CardService = inject(CardService);
  protected cardDetails = this.cardService.findCardById(
    '56ebc372-aabd-4174-a943-c7bf59e5028d',
  );
}
