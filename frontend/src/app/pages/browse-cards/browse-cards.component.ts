import { Component, computed, inject, OnInit, Signal } from '@angular/core';
import { CardService } from '../../services/cards/card.service';
import { ICard, PaginationResponse } from 'lib';
import { CardTileComponent } from '../../components/card-tile/card-tile.component';
import { NgClass } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, Subject } from 'rxjs';

@Component({
  imports: [CardTileComponent, NgClass, FormsModule, ReactiveFormsModule],
  selector: 'app-browse-cards',
  templateUrl: './browse-cards.component.html',
  standalone: true,
})
export class BrowseCardsComponent implements OnInit {
  private cardService: CardService = inject(CardService);
  private searchInput = new Subject<string>();
  protected cards: Signal<PaginationResponse<ICard>> = computed(() =>
    this.cardService.getPagedCards(),
  );
  protected totalPages = computed(() =>
    Math.ceil(this.cards().total / this.cards().limit),
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

  ngOnInit() {
    this.searchInput.pipe(
      debounceTime(300) // Adjust the debounce time (in milliseconds) as needed
    ).subscribe((searchTerm: string) => {
      this.cardService.setTextFilter(searchTerm);
    });
  }

  goToPage(page: number): void {
    this.cardService.setOffset(page * this.cards().limit);
  }

  filterCards(event: any){
    this.searchInput.next((event.target as HTMLInputElement).value);
  }
}
