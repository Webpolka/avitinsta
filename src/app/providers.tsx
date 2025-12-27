import { BrowserRouter, HashRouter } from "react-router-dom";
import { AppRouter } from "./router";
// import ScrollToTop from "@/components/scrolltotop";

const Router =
  import.meta.env.MODE === "production" ? HashRouter : BrowserRouter;

export function AppProviders() {
  return (
    <Router>     
      {/* <ScrollToTop /> */}
      <AppRouter />
    </Router>
  );
}
