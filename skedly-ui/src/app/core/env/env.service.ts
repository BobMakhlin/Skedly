import {Injectable} from '@angular/core';
import {getEnv} from './env.utils';

@Injectable({providedIn: 'root'})
export class EnvService {
  public readonly apiUrl = getEnv('apiUrl');
}
