import { Component, inject, Signal } from '@angular/core';
import { UserService } from '../../../services/user/user.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { HeroVisualSectionComponent } from './hero-visual-section/hero-visual-section.component';

@Component({
  imports: [CommonModule, HeroVisualSectionComponent],
  selector: 'app-hero-panel',
  templateUrl: './hero-panel.component.html',
  standalone: true,
})
export class HeroPanelComponent {
  userService: UserService = inject(UserService);

  protected numberOfActiveUsers: Signal<number> = toSignal(
    this.userService.getNumberOfTodaysActiveUsers(),
    { initialValue: 0 },
  );
}
