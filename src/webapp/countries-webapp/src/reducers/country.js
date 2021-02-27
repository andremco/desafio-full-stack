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
            const { countries, country } = action
            let nextState = state
            if (Array.isArray(countries)) {
                for (let c of countries) {
                    if (c.id && nextState[c.id]) {
                        nextState[c.id].name = c.name
                        nextState[c.id].capital = c.capital
                        nextState[c.id].isModified = true
                    }
                }
            }
            
            if (country && country.id && nextState[country.id]) {
                nextState[country.id].name = country.name
                nextState[country.id].capital = country.capital
                nextState[country.id].isModified = true
            }
            return nextState
        }
        default: 
            return state
    }
}