import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  imports: [FormsModule, ReactiveFormsModule],
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  standalone: true,
})
export class SignInComponent {
  private authService: AuthService = inject(AuthService);
  private router: Router = inject(Router);

  protected userDataFormGroup: FormGroup =
    new FormGroup({
      email: new FormControl<string>('', {
        validators: [Validators.email, Validators.required],
        nonNullable: true,
      }),
      password: new FormControl<string>('', {
        validators: Validators.required,
        nonNullable: true,
      }),
    });

  protected async signingInUser() {
    if (this.userDataFormGroup.invalid) {
      return;
    }
    this.authService.login(this.userDataFormGroup.value).subscribe({
      next: async () => { this.router.navigate(['/']); },
    });
  }
}
