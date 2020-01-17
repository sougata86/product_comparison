
import { InjectionToken } from '@angular/core';

export interface AppConfigInterface {
    BASE_API_ENDPOINT: string;
    PASSWORD_MIN_LENGTH: number;
    PASSWORD_MAX_LENGTH: number;
    USER_SESSION_KEY: string;
}

export const APP_CONFIG = new InjectionToken('app.config');
export const AppConfig: AppConfigInterface = {
    BASE_API_ENDPOINT: 'http://localhost:15422/api',
    PASSWORD_MIN_LENGTH: 5,
    PASSWORD_MAX_LENGTH: 15,
    USER_SESSION_KEY: 'user',
};
