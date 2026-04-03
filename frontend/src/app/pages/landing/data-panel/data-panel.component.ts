import { Component, inject, Signal } from '@angular/core';
import { CardService } from '../../../services/cards/card.service';
import { UserService } from '../../../services/user/user.service';
import { DeckService } from '../../../services/deck/deck.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  imports: [],
  selector: 'app-data-panel',
  templateUrl: './data-panel.component.html',
  standalone: true,
})
export class DataPanelComponent {
  protected userService: UserService = inject(UserService);
  protected cardService: CardService = inject(CardService);
  protected deckService: DeckService = inject(DeckService);

  protected numberOfDecks: Signal<number> = toSignal(
    this.deckService.getNumberOfDecks(),
    { initialValue: 0 },
  );

  protected numberOfUsers: Signal<number> = toSignal(
    this.userService.getNumberOfUsers(),
    { initialValue: 0 },
  );
}
