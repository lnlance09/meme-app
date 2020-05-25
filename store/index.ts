import { createStore, applyMiddleware, compose } from "redux"
import logger from "redux-logger"
import thunk from "redux-thunk"
import rootReducer from "./reducer"

const initialState = {}
const middleware = [thunk]

const store = createStore(
	rootReducer,
	initialState,
	compose(applyMiddleware(...middleware, logger))
)

export const initializeStore = (preloadedState = initialState) => {
	return createStore(rootReducer, preloadedState)
}

export default store
