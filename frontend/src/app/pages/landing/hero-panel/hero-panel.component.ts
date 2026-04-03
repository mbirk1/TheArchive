import {
  Component,
  inject,
  computed,
  Signal,
  effect,
  signal,
  ChangeDetectorRef,
} from '@angular/core';
import { UserService } from '../../../services/user/user.service';
import { CardService } from '../../../services/cards/card.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { ICard } from 'lib';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  imports: [CommonModule],
  selector: 'app-hero-panel',
  templateUrl: './hero-panel.component.html',
  standalone: true,
})
export class HeroPanelComponent {
  userService: UserService = inject(UserService);
  cardService: CardService = inject(CardService);

  private cdr = inject(ChangeDetectorRef);

  protected card = signal<ICard | undefined>(undefined);

  constructor() {
    this.cardService.getRandomCard().subscribe((card) => {
      this.card.set(card);
      this.cdr.markForCheck();
    });
  }

  protected numberOfActiveUsers: Signal<number> = toSignal(
    this.userService.getNumberOfTodaysActiveUsers(),
    { initialValue: 0 },
  );
}
