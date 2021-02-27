import * as types from '../constants/types'
import API from '../API/API'
import { createError } from './error'
import { loaded, loading } from "./loading";

export function getCountries(countries) {
    return {
        type: types.countries.GET,
        countries
    }
}

export function updateCountry(country) {
    return {
        type: types.countries.UPDATE,
        country
    }
}

export function updateCountries(countries) {
    return {
        type: types.countries.UPDATE,
        countries
    }
}

export function getAllGraphCountries() {

    const queryCountries = `
        query {
            Country {
                _id
                name
                area
                population
                populationDensity
                capital
                flag {
                    svgFile                  
                }
                topLevelDomains {
                    name
                    countries{
                        name
                        capital
                    }
                }
            }
        }
    `;

    return dispatch => {
        dispatch(loading());
        return API.postByQuery(types.URL.GRAPH_COUNTRIES, queryCountries)
            .then(res => res.json())
            .then(response => {
                if(response && response.data && response.data.Country){
                    dispatch(getCountries(response.data.Country))
                    dispatch(loaded())
                }
            })
            .catch(err => { 
                console.log(err)
                dispatch(createError(err))
                dispatch(loaded())
            })
    }
}

export function createCustomCountry(data, callback){

    return dispatch => {
        return API.postWithBasicAuth(types.URL.CUSTOM_COUNTRIES + "countries", data, types.AUTH)
            .then(res => res.json())
            .then(response => {
                dispatch(updateCountry(response));
                callback();
            })
            .catch(err => { 
                console.log(err)
                dispatch(createError(err))
                callback();
            })
    }
}

export function getAllCustomCountries(){

    return dispatch => {
        dispatch(loading());
        return API.getWithBasicAuth(types.URL.CUSTOM_COUNTRIES + "countries", types.AUTH)
            .then(res => res.json())
            .then(response => {
                dispatch(updateCountries(response));
                dispatch(loaded())
            })
            .catch(err => { 
                console.log(err)
                dispatch(createError(err))
                dispatch(loaded())
            })
    }
}

