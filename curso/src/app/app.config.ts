import { ApplicationConfig, LOCALE_ID, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { ERROR_LABEL, LoggerService } from '@my/library';
import { environment } from 'src/environments/environment';

// Cargar idioma
import { DATE_PIPE_DEFAULT_OPTIONS, registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import localeEsExtra from '@angular/common/locales/extra/es';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import { ajaxWaitInterceptor } from './layout';
import { AuthInterceptor } from './security';
registerLocaleData(localeEs, 'es', localeEsExtra);

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes, withComponentInputBinding()),
    LoggerService,
    { provide: ERROR_LABEL, useValue: environment.ERROR_LABEL},
    { provide: LOCALE_ID, useValue: 'es-Es'},
    { provide: DATE_PIPE_DEFAULT_OPTIONS, useValue: { dateFormat: 'dd/MMMM/yy' } },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true, },
    provideHttpClient(withInterceptorsFromDi(),  withInterceptors([ ajaxWaitInterceptor ]))
  ]
};
