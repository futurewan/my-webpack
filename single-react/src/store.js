import { createStore, combineReducers } from "redux";
import {reducers as homeReducer} from './pages/home'

const reducer = combineReducers({
    home:homeReducer
})

const store = createStore(reducer);

export default store;