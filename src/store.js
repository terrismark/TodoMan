import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './reducers'

const initinalState = {}

const middleware = [thunk]

function storeFunction() {
    try {
        return createStore(rootReducer, initinalState, compose(
                applyMiddleware(...middleware),
                window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
            ))
    } catch(error) {
        return createStore(rootReducer, initinalState, compose(
                applyMiddleware(...middleware),
            ))
    }
}

const store = storeFunction()

export default store