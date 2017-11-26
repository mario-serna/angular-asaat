const url = [
    'http://localhost',
    'http://192.168.2.15',
    'http://192.168.1.5',
    'https://asaat.000webhostapp.com/'
];

const REAL_TIME_SERVER_HOST = url[3];
const REAL_TIME_SERVER_PORT = 8080;

const AUTH_SERVER_URL_HOST = url[3];
const AUTH_SERVER_URL_PORT = 8080;

const APP_NAME = 'ASAAT';

/*export const AppConfig = {
    REAL_TIME_SERVER_URL: `${REAL_TIME_SERVER_HOST}:${REAL_TIME_SERVER_PORT}`,
    API_SERVER_URL: `${REAL_TIME_SERVER_HOST}:${REAL_TIME_SERVER_PORT}`,
    AUTH_SERVER_URL: `${AUTH_SERVER_URL_HOST}:${AUTH_SERVER_URL_PORT}`,
    APP_NAME: APP_NAME
};*/

export const AppConfig = {
    REAL_TIME_SERVER_URL: `${REAL_TIME_SERVER_HOST}`,
    API_SERVER_URL: `${REAL_TIME_SERVER_HOST}`,
    AUTH_SERVER_URL: `${AUTH_SERVER_URL_HOST}`,
    APP_NAME: APP_NAME
};
