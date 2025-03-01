import React from "react";
import ReactDOM from "react-dom/client"; // Correct import for React 18+
import TicTacToe from "./App";  // Import the TicTacToe component

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <TicTacToe />
  </React.StrictMode>
);
