import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
//redux toolkit for state management  # "npm install @reduxjs/toolkit, npm install redux react-redux"
import { store } from "./redux/store";
import { Provider } from "react-redux";

/**/
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

//ReactDOM.render(<App/>, document.getElementById('root'));
