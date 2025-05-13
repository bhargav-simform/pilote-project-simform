import React from 'react';

import './App.css';
import { ThemeProvider } from './context/themeContext';
import Navbar from './components/molecules/navbar';
import Index from './pages';

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <div className="App">
        <Navbar />
        <Index />
      </div>
    </ThemeProvider>
  );
};

export default App;
