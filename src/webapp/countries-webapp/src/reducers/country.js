import initialState from '../constants/initialState'
import * as types from '../constants/types'

export function countries(state = initialState.countries, action) {
    switch (action.type) { 
        case types.countries.GET: {
            const { countries } = action
            let nextState = state
            for (let country of countries) {
                if (country._id && !nextState[country._id]) {
                    nextState[country._id] = country
                }
            }
            return nextState
        }
        case types.countries.UPDATE: {
            const { country } = action
            let nextState = state

            if (country && country.id && nextState[country.id]) {
                nextState[country.id].name = country.name
                nextState[country.id].capital = country.capital
                nextState[country.id].area = country.area
                nextState[country.id].population = country.population
                nextState[country.id].populationDensity = country.populationDensity
                nextState[country.id].isModified = true
            }
            return nextState
        }
        default: 
            return state
    }
}