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
        default: 
            return state
    }
}