export const countries = {
    CREATE: 'webapp/countries/create',
    GET: 'webapp/countries/get',
    UPDATE: 'webapp/countries/update',
    DELETE: 'webapp/countries/delete'
}

export const app = {
    ERROR: 'webapp/error',
    LOADED: 'webapp/loaded',
    LOADING: 'webapp/loading'
}

export const URL = {
    GRAPH_COUNTRIES: process.env.REACT_APP_API_GRAPH_COUNTRIES,
    CUSTOM_COUNTRIES: process.env.REACT_APP_API_CUSTOM_COUNTRIES
}

export const AUTH = process.env.REACT_APP_AUTH_ENCODE