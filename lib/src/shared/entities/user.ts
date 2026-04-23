import { FormControl } from '@angular/forms';

export interface IUser {
  id?: string;
  email: string;
  password: string;
  userName: string;
  createdAt: Date;
  lastActiveAt: Date;
}

export interface ICreateUserFormData {
  userName: FormControl<string>;
  eMail: FormControl<string>;
  password: FormControl<string>;
  confirmPassword: FormControl<string>;
}

export interface ICreateUserFormDataValue {
  userName: string;
  eMail: string;
  password: string;
  confirmPassword: string;
}

export interface IUserSignInFormData {
  eMail: FormControl<string>;
  password: FormControl<string>;
}

export interface IUserSignInFormDataValue {
  eMail: string;
  password: string;
}
