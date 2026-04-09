import {
  Component,
  inject,
  computed,
  signal,
  WritableSignal,
} from '@angular/core';
import { SignInComponent } from './sign-in.component/sign-in.component';
import { NgClass } from '@angular/common';
import { SignUpComponent } from './sign-up.component/sign-up.component';
import { ConfigService } from '../../services/config/config.service';

type SwitcherState = 'login' | 'signup';

@Component({
  imports: [SignInComponent, NgClass, SignUpComponent],
  selector: 'app-sign-up-in',
  templateUrl: './sign-up-in.component.html',
  standalone: true,
})
export class SignUpInComponent {
  private configService: ConfigService = inject(ConfigService);

  protected switcherState: WritableSignal<SwitcherState> = signal('login');

  protected enableSso = computed(() => {
    return this.configService.enableSsoLoginOrSignUp;
  });
}
