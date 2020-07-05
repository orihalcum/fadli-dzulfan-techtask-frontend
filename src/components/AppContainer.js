import React from 'react';

const AppContainer = ({ children }) => {
  return (
    <div 
      data-testid="App-container" 
      className="App-container"
    >
      { children }
    </div>
  );
};

export default AppContainer;