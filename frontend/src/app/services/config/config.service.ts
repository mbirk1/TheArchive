import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { APP_CONFIG_MAP, AppConfig, EnvName } from '../../config/app-config';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  private readonly config: AppConfig;

  constructor() {
    const env = environment.envName as EnvName;
    this.config = APP_CONFIG_MAP[env];
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
