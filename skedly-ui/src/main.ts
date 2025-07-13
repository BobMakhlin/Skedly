import {bootstrapApplication} from '@angular/platform-browser';
import {appConfig} from './app/app.config';
import {AppComponent} from './app/app.component';
import {enableProdMode} from '@angular/core';

fetch('/assets/config/config.json')
  .then((response) => {
    if (!response.ok) {
      throw new Error('Failed to load runtime config');
    }
    return response.json();
  })
  .then((config) => {
    (window as any).__env = config;
    if ((window as any).__env.production) {
      enableProdMode();
    }
    return bootstrapApplication(AppComponent, appConfig);
  })
  .catch((err) => {
    console.error('Failed to bootstrap app:', err);
  });
