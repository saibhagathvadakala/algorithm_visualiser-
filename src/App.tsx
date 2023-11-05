import React, { useEffect } from 'react';
import './App.css';
import Visualizer from './components/Visualizer/Visualizer';


function App() {

  // Document title change
  useEffect(() => {
    document.title = 'Algorithm Visualizer'; 
  }, []);

  return (
    <div className="App">
      <Visualizer />
    </div>
  );
}

export default App;