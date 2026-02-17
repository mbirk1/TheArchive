import { Component, computed, inject, signal, Signal } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  imports: [RouterLink],
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

  protected navigateToDecks(): void {
    this.router.navigate(['/user/decks']);
  }

  protected navigateToCollection(): void {
    this.router.navigate(['/user/collection']);
  }

  protected navigateToProfile(): void {
    this.router.navigate(['/user/profile']);
  }
}
