import * as types from '../constants/types'
import API from '../API/API'
import { createError } from './error'
import { loaded, loading } from "./loading";

export function updateCountries(countries) {
    return {
        type: types.countries.GET,
        countries
    }
}

export function getAllCountries() {

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
                    dispatch(updateCountries(response.data.Country))
                    dispatch(loaded())
                }
            })
            .catch(err => { 
                dispatch(createError(err))
                dispatch(loaded())
            })
    }
}