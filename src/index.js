import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import React from "react";
import ReactDOM from "react-dom/client";
import "./style/index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";

//Fonts
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

//Context
import { AllTodoProvider } from "./context/todo.context";
import { FilteredTodoProvider } from "./context/filter.context";
import { ThemeProvider } from "@mui/material";
import { theme } from "./theme";

const client = new ApolloClient({
  uri: "https://graphqlzero.almansi.me/api",
  cache: new InMemoryCache(),
});

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <ApolloProvider client={client}>
      <React.StrictMode>
        <ThemeProvider theme={theme}>
          <AllTodoProvider>
            <FilteredTodoProvider>
              <App />
            </FilteredTodoProvider>
          </AllTodoProvider>
        </ThemeProvider>
      </React.StrictMode>
    </ApolloProvider>
  </BrowserRouter>
);

reportWebVitals();
