import { Component, computed, inject, Signal } from '@angular/core';
import { CardService } from '../../services/cards/card.service';
import { ICard, PaginationResponse } from 'lib';
import { CardTileComponent } from '../../components/card-tile/card-tile.component';
import { NgClass, NgStyle } from '@angular/common';

@Component({
  imports: [CardTileComponent, NgClass],
  selector: 'app-browse-cards',
  templateUrl: './browse-cards.component.html',
  standalone: true,
})
export class BrowseCardsComponent {
  private cardService: CardService = inject(CardService);
  protected cards: Signal<PaginationResponse<ICard>> = computed(() =>
    this.cardService.getPagedCards(),
  );
  protected totalPages = computed(() =>
    Math.ceil(this.cards().total / this.cards().limit),
  );
  protected pageNumbers: Signal<number[]> = computed(() =>
    Array.from({ length: this.totalPages() }, (_, i) => i),
  );
  protected currentPage = computed(() =>
    Math.floor(this.cards().offset / this.cards().limit),
  );

  protected visiblePages = computed(() => {
    const total = this.totalPages();
    const current = this.currentPage();
    const pages: (number | '...')[] = [];

    if (total <= 7) {
      return Array.from({ length: total }, (_, i) => i);
    }
    pages.push(0);
    if (current > 2) {
      pages.push('...');
    }
    if (current - 1 > 0) {
      pages.push(current - 1);
    }
    if (current !== 0 && current !== total - 1) {
      pages.push(current);
    }
    if (current + 1 < total - 1) {
      pages.push(current + 1);
    }
    if (current < total - 3) {
      pages.push('...');
    }
    pages.push(total - 1);

    return pages;
  });

  goToPage(page: number): void {
    this.cardService.setOffset(page*this.cards().limit);
  }
}
