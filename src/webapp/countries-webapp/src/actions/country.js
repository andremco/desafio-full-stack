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
            .then(async (response) => {
                if(response && response.data && response.data.Country){
                    
                    var countriesGraph = response.data.Country;
                    var customCountries = await getAllCustomCountries();
                    
                    var countries = [];

                    for (let countryGraph of countriesGraph) {

                        let customCountry;
                        if(Array.isArray(customCountries)){
                            customCountry = customCountries.find(e => e.id == countryGraph._id);
                        }

                        if (customCountry) {
                            countryGraph.name = customCountry.name
                            countryGraph.capital = customCountry.capital
                            countryGraph.area = customCountry.area
                            countryGraph.population = customCountry.population
                            countryGraph.populationDensity = customCountry.populationDensity
                            countryGraph.isModified = true

                            countries.push(countryGraph)
                        }
                        else{
                            countries.push(countryGraph)
                        }
                    }

                    dispatch(getCountries(countries))
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

function getAllCustomCountries(){
    return API.getWithBasicAuth(types.URL.CUSTOM_COUNTRIES + "countries", types.AUTH)
            .then(res => res.json())
            .then(response => {
                return response;
            })
            .catch(err => { 
                console.log(err)
                return []
            })
}

