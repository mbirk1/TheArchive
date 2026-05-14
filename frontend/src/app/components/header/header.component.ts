import { Component, computed, inject, Signal } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { Router } from '@angular/router';
import { HeaderChipComponent } from './header-chips/header-chip.component';

@Component({
  imports: [HeaderChipComponent],
  selector: 'app-header',
  templateUrl: './header.component.html',
  standalone: true,
})
export class HeaderComponent {
  protected router: Router = inject(Router);
  protected userService: UserService = inject(UserService);
  protected isUserLoggedIn: Signal<boolean> = computed(() =>
    this.userService.isUserLoggedIn(),
  );

  navigateToDecks(): void {
    this.router.navigate(['/user/decks']);
  }

  navigateToCollection(): void {
    this.router.navigate(['/browse']);
  }

  protected navigateToProfile(): void {
    this.router.navigate(['/user/profile']);
  }

  protected navigateToLoginSignUp(): void {
    this.router.navigate(['/login']);
  }

  navigateToOwnCollection(): void {
    this.router.navigate(['/user/collection']);
  }
}
