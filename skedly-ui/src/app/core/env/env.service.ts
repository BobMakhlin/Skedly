import {Injectable} from '@angular/core';
import {Env, getEnv} from './env';

@Injectable({ providedIn: 'root' })
export class EnvService {
  get<T extends keyof Env>(key: T): Env[T] {
    return getEnv(key);
  }

  get apiUrl(): string {
    return this.get('apiUrl');
  }

  get isProduction(): boolean {
    return this.get('production');
  }
}
