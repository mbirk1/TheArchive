export interface ENVIRONMENT_SCHEMA {
  apiUrl: string,
  production: boolean,
  envName: string,
  githubLink: string,
  enableSsoLoginOrSignUp: boolean,
}

export const environment: ENVIRONMENT_SCHEMA = {
  apiUrl: 'http://localhost:3000/api',
  production: false,
  envName: 'dev',
  githubLink: 'https://github.com/mbirk1/TheArchive',
  enableSsoLoginOrSignUp: true,
};
