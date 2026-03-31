import { Component, computed, inject, signal, Signal } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { Router, RouterLink } from '@angular/router';
import { HeaderChipComponent } from './header-chips/header-chip.component';

@Component({
  imports: [RouterLink, HeaderChipComponent],
  selector: 'app-header',
  templateUrl: './header.component.html',
  standalone: true,
})
export class HeaderComponent {
  protected userService: UserService = inject(UserService);
  protected isUserLoggedIn: Signal<boolean> = computed(() =>
    this.userService.isUserLoggedIn(),
  );

  constructor(private router: Router) {}

  navigateToDecks(): void {
    this.router.navigate(['/user/decks']);
  }

  navigateToCollection(): void {
    this.router.navigate(['/user/collection']);
  }

  protected navigateToProfile(): void {
    this.router.navigate(['/user/profile']);
  }
}
