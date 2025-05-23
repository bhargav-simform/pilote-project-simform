import React from "react";
import "./App.css";
import { ThemeProvider } from "./context/themeContext";
import RouterPath from "./routes/Router";

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <RouterPath />
    </ThemeProvider>
  );
};

export default App;
