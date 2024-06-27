import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App"; // Import the main App component
import "./index.css"; // Import global styles

// Create a root element and render the App component within it
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
