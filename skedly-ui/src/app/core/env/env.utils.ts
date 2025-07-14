export interface EnvUtils {
  apiUrl: string;
  production: boolean;
}

declare global {
  interface Window {
    __env: EnvUtils;
  }
}

export function getEnv<T extends keyof EnvUtils>(key: T): EnvUtils[T] {
  if (!window.__env) {
    throw new Error('Runtime environment is not loaded');
  }
  return window.__env[key];
}
