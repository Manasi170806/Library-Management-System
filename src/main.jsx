import React from "react";
 import ReactDOM from "react-dom/client";
 import { Provider } from "react-redux";
 import { store } from "./store/store";
import App from "./App";
import { BrowserRouter } from "react-router-dom";  // ✅ BrowserRouter yaha

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);




// Gothic Fiction
// Romance
// Dystopian
// Southern Gothic
// Tragedy
// Adventure
// Historical Fiction
// Psychological Fiction
// Epic Poetry
// Adventure Fiction
// Modernist
// Postmodernist
// The Brothers Karamazov
// Fyodor Dostoevsky