import { combineReducers, createStore } from "redux";

import loadingReducer from "./ducks/loading";

export const rootReducer = combineReducers({
  isLoading: loadingReducer,
});

const store = createStore(rootReducer);

export default store;
