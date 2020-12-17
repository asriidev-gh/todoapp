import React from "react";
import ReactDOM from "react-dom";

// Libraries that kept the state even the browser refresh
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/lib/integration/react";

import { Provider } from "react-redux";
import { configureStore } from "./store";
import App from "./App.js";

// Libraries that kept the state even the browser refresh
const store = configureStore();
const persistor = persistStore(store);

ReactDOM.render(
  <Provider store={store}>
    <PersistGate 
      loading={<div>Loading..</div>}
      persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);
