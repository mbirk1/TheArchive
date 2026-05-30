import { Injectable } from '@angular/core';
import { environment, ENVIRONMENT_SCHEMA } from './../../environments/environment';

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
