import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserService } from '../../../services/user/user.service';

@Component({
  imports: [RouterLink],
  selector: 'app-cta-panel',
  templateUrl: './cta-panel.component.html',
  standalone: true,
})
export class CtaPanelComponent {
  protected userService: UserService = inject(UserService);
}
