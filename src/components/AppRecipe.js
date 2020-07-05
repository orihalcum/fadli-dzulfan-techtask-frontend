
import React from 'react';
import PropTypes from 'prop-types'

export const AppRecipe = ({ recipes, viewDetailRecipe }) => {
  return (
    <div data-testid="App-content-recipes" className="App-content-recipes">
      <h3 className="App-content-recipes-title">Recomended Recipes</h3>
      <div className="App-content-recipes-list">
        { recipes.map((item, key) => <RecipeList { ...item } key={ key } viewDetailRecipe={ viewDetailRecipe } />) }
      </div>
    </div>
  )
}

export const RecipeList = ({ title, image, ingredients, viewDetailRecipe }) => {
  return <div data-testid="App-recipe" className="App-recipe" style={{ backgroundImage: `url(${image})` }} onClick={ () => viewDetailRecipe({ title, image, ingredients }) } />
}

AppRecipe.propTypes = {
  recipes: PropTypes.array,
  viewDetailRecipe: PropTypes.func
}

AppRecipe.defaultProps = {
  recipes: [],
}