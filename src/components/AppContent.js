import React from 'react';

const AppContent = ({ setShowAside, showModalRecomendationRecipe, children }) => {
  return (
    <div 
      data-testid="App-content" 
      className="App-content" 
      onClick={ () => setShowAside(false) } 
      style={{ paddingBottom: showModalRecomendationRecipe ? 110 : 30 }}
    >
      { children }
    </div>
  );
};

export default AppContent;