import React from 'react';
import PropTypes from 'prop-types'
import { filterIngredients } from '../helpers';

export const IngredientList = (props) => {

  let { title, index, checked, handlePickIngredient } = props

  return (
    <div data-testid="App-ingredient" className="App-ingredient">
      <span  data-testid="App-ingredient-title" className={ checked ? 'color-primary' : '' }>{ title }</span>
      <small data-testid="App-ingredient-use-by">{ props['use-by'] }</small>
      <input data-testid="App-ingredient-checkbox" type="checkbox" onChange={ e => handlePickIngredient(e.target.checked, index) } checked={ checked } value={ checked } />
    </div>
  )
}

export const AppIngredients = (props) => {
  let { ingredients, showModalRecomendationRecipe, clearPick, pickDate } = props
  let data = filterIngredients(ingredients, pickDate)
  return (
    <div data-testid="App-content-ingredients" className="App-content-ingredients mt-30">
      <h3 className="App-content-ingredients-title">Available Ingredients { showModalRecomendationRecipe && <small onClick={ clearPick }>Clear</small> }</h3>
      <div data-testid="App-content-ingredients-list" className="App-content-ingredients-list">
        { 
          data.length > 0
          ? data.map((item, key) => <IngredientList { ...item } { ...props } key={ key } index={ key } />)
          : <small className="color-light-grey">No available ingredients</small>
        }
      </div>
    </div>
  )
}

AppIngredients.propTypes = {
  ingredients: PropTypes.array,
  showModalRecomendationRecipe: PropTypes.bool,
  clearPick: PropTypes.func,
  // pickDate: PropTypes.,
}

AppIngredients.defaultProps = {
  ingredients: [],
  pickDate: `${new Date()}`
}