import "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import WatchlistProvider from "./context/WatchlistProvider";
import TrainingProvider from "./context/TrainingProvider";
import "./styles.scss";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <TrainingProvider>
    <WatchlistProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </WatchlistProvider>
  </TrainingProvider>
);
