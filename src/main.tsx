import ReactDOM from "react-dom/client";
import { AppProviders } from "./app/providers";
import "./index.css";
import "./app.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <AppProviders />
);
