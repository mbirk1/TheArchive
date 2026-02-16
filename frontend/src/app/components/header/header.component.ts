import { Component, signal, Signal } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-header',
  templateUrl: './header.component.html',
  standalone: true,
})
export class HeaderComponent {
  protected isBurgerMenuActive: Signal<boolean> = signal<boolean>(false);

  toggleBurgerMenu(): void {
    this.isBurgerMenuActive = signal<boolean>(!this.isBurgerMenuActive());
  }
}