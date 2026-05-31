import { FormControl } from '@angular/forms';
import { IDeck } from './deck';

export interface IUser {
  id?: string;
  email: string;
  password: string;
  userName: string;
  createdAt: Date;
  lastActiveAt: Date;
  decks: IDeck[];
  refreshToken: string;
}

export interface IAuthTokens {
  access_token: string;
  refresh_token: string;
}

export interface ILoginRequest {
  email: string;
  password: string;
}

export interface IRegisterRequest {
  email: string;
  password: string;
  confirmPassword: string;
  userName?: string;
}

export interface IAuthUser {
  userId: string;
  email: string;
}

export interface IAuthState {
  user: IAuthUser | null;
  isLoading: boolean;
  error: string | null;
}
