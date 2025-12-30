import { BrowserRouter, HashRouter } from "react-router-dom";
import { AppRouter } from "./router";
import { UserProvider } from "@/context/user.provider";
import  UseScrollToTop  from "@/hooks/useScrollToTop";

const Router =
  import.meta.env.MODE === "production" ? HashRouter : BrowserRouter;

export function AppProviders() {
  
  return (    

    <Router>      
      <UseScrollToTop/>
      <UserProvider>
        <AppRouter />
      </UserProvider>
    </Router>
  );
}
