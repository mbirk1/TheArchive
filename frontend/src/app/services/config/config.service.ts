import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';

export interface ENVIRONMENT_SCHEMA {
  apiUrl: string,
  production: boolean,
  envName: string,
  githubLink: string,
  enableSsoLoginOrSignUp: boolean,
}

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  private readonly config: ENVIRONMENT_SCHEMA;

  constructor() {
      this.config = environment;
  }

  get apiUrl(): string {
    return this.config.apiUrl;
  }

  isProduction(): boolean {
    return environment.production;
  }

  get gitHubLink(): string {
    return environment.githubLink;
  }

  get enableSsoLoginOrSignUp() {
    return environment.enableSsoLoginOrSignUp;
  }
}
