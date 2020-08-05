import { createStore, compose, applyMiddleware } from "redux";
import { rootReducer } from "./reducers/index";
import thunk from "redux-thunk";
import socketIoMiddleware from "./socketIoMiddleware";


const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk, socketIoMiddleware),
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? window.__REDUX_DEVTOOLS_EXTENSION__ &&
          window.__REDUX_DEVTOOLS_EXTENSION__()
      : (f) => f
  )
);

export default store;
