import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { IUserSignInFormData } from 'lib';
import { UserService } from '../../../services/user/user.service';

@Component({
  imports: [FormsModule, ReactiveFormsModule],
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  standalone: true,
})
export class SignInComponent {
  private userService: UserService = inject(UserService);

  protected userDataFormGroup: FormGroup<IUserSignInFormData> =
    new FormGroup<IUserSignInFormData>({
      eMail: new FormControl<string>('', {
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
    this.userService.signingInUser(this.userDataFormGroup.value);
  }
}
