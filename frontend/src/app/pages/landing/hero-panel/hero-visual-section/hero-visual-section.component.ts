import { Component, inject, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ICard } from 'lib';
import { CommonModule } from '@angular/common';
import { CardService } from '../../../../services/cards/card.service';

@Component({
  imports: [CommonModule],
  selector: 'app-hero-visual-section',
  templateUrl: './hero-visual-section.component.html',
  standalone: true,
})
export class HeroVisualSectionComponent {
  cardService: CardService = inject(CardService);

  protected card: Signal<ICard | undefined> = toSignal(
    this.cardService.getRandomCard(),
    { initialValue: undefined },
  );
}
