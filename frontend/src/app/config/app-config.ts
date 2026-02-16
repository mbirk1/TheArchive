export type EnvName = 'dev' | 'prod';

export interface AppConfig {
  apiUrl: string;
}

export const APP_CONFIG_MAP: Record<EnvName, AppConfig> = {
  dev: {
    apiUrl: 'http://localhost:3000',
  },
  prod: {
    apiUrl: 'https://api.example.com',
  },
};
