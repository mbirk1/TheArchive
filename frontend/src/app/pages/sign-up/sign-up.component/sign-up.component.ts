import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../../services/user/user.service';
import { ICreateUserFormData } from 'lib';
import { firstValueFrom } from 'rxjs';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  standalone: true,
})
export class SignUpComponent {
  private userService: UserService = inject(UserService);

  protected userDataFormGroup: FormGroup<ICreateUserFormData> = new FormGroup<ICreateUserFormData>({
    userName: new FormControl<string>('', { validators: Validators.required, nonNullable: true }),
    eMail: new FormControl<string>('', { validators: [Validators.email, Validators.required], nonNullable: true }),
    password: new FormControl<string>('', { validators: Validators.required, nonNullable: true }),
    confirmPassword: new FormControl<string>('', { validators: Validators.required, nonNullable: true }),
  });

  protected async createUser() {
    if (this.userDataFormGroup.invalid) return;

    const { password, confirmPassword } = this.userDataFormGroup.getRawValue();

    if (password !== confirmPassword) {
      // Show Error
      return;
    }

    this.userService.createUser(this.userDataFormGroup.value);
  }
}
