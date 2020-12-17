import { createStore, combineReducers, applyMiddleware } from "redux";
import { todos } from './redux/todos/todo.reducer';

// Libraries that kept the state even the browser refresh
import { persistReducer } from "redux-persist";
import storage from  "redux-persist/lib/storage";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";

// Redux Logger
import logger from "redux-logger";

const reducers = {
    todos,
};

//1.) combines all actions response and state of our app
const rootReducer = combineReducers(reducers);

//2.) To kept the state even the browser refresh
// what autoMergeLevel2 does is tells redux state how to reconcile the initial and storage state of our application, and how deep it is doing so
const persistConfig = {
    key: "root",
    storage,
    stateReconciler: autoMergeLevel2,
}

const persistedReducer = persistReducer(persistConfig,rootReducer);

export const configureStore = () => createStore(
    persistedReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__(),
    // applyMiddleware(logger)
);
