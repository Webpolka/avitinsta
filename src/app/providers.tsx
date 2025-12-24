import {BrowserRouter, HashRouter } from "react-router-dom";
import { AppRouter } from "./router";

const Router = import.meta.env.MODE === "production" ? HashRouter : BrowserRouter;

export function AppProviders() {
  return (
    <Router>
      <AppRouter />
    </Router>
  );
}



