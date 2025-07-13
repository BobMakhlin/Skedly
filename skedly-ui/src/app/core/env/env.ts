export interface Env {
  apiUrl: string;
  production: boolean;
}

declare global {
  interface Window {
    __env: Env;
  }
}

export function getEnv<T extends keyof Env>(key: T): Env[T] {
  if (!window.__env) {
    throw new Error('Runtime environment is not loaded');
  }
  return window.__env[key];
}
