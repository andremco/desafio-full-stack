import { combineReducers } from 'redux'
import { loading } from "./loading";
import { error } from "./error";
import { countries } from "./countries";

const rootReducer = combineReducers({ 
    loading,
    error,
    countries
});

export default rootReducer;