import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { initializeIcons } from "@fluentui/react";

import ErrorBoundary from "./components/ErrorBoundary";
import { SearchStoreProvider } from "./stores/SearchStoreContext";
import App from "./App";

initializeIcons();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundary>
      <SearchStoreProvider>
        <App />
      </SearchStoreProvider>
    </ErrorBoundary>
  </StrictMode>
);
