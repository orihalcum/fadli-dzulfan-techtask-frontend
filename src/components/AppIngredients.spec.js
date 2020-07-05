import React from 'react';
import { render, act } from '@testing-library/react';
import { AppIngredients, IngredientList } from './AppIngredients';
import { AppModalRecomendationRecipe } from './AppModal'
describe('render ingredients correctly', () => {

  const ingredients = [{
    title: "Ham",
    "use-by": "2020-11-25",
    checked: true
  },
  {
    title: "Cheese",
    "use-by": "2020-01-08",
    checked: true
  },
  {
		title: "Sausage",
    "use-by": "2020-11-25",
    checked: false
	}]

  it('app content ingredients exist and show the right title', () => {
    act(() => {
      const { queryByTestId } = render(<AppIngredients />);
      const AppContentIngredients = queryByTestId('App-content-ingredients');
      expect(AppContentIngredients).toBeInTheDocument();
      expect(AppContentIngredients.children[0].textContent).toBe('Available Ingredients ');
    });
  })

  it('showing button clear and show modal recomendation', () => {
    const props = { ingredients, showModalRecomendationRecipe: true, handlePickIngredient: () => ''};
    const { queryByTestId } = render(<AppIngredients { ...props }/>);
    const AppContentIngredients = queryByTestId('App-content-ingredients');
    expect(AppContentIngredients.children[0].textContent).toBe('Available Ingredients Clear');
    // expect show modal recomendation here
  })

  it('app ingredients list exist', () => {
    const { queryByTestId } = render(<AppIngredients />);
    expect(queryByTestId('App-content-ingredients-list')).toBeInTheDocument();
  })

  it('showing ingredients list correctly', () => {
    const props = { ingredients, showModalRecomendationRecipe: true, handlePickIngredient: () => ''};
    const { container } = render(<AppIngredients { ...props }/>);
    const AppIngredientsNodes = container.querySelectorAll('.App-ingredient')
    expect(AppIngredientsNodes.length).toBe(ingredients.length-1) // 1 of the data already used-by
  })

  // it('filtered ingredients', () => {})

  it('render first ingredients correctly', () => {
    const props = { ...ingredients[0], handlePickIngredient: () => ''};
    const { queryByTestId } = render(<IngredientList { ...props }/>);
    expect(queryByTestId('App-ingredient').firstElementChild.textContent).toBe('Ham')
    expect(queryByTestId('App-ingredient').childNodes[0].textContent).toBe('Ham')
    expect(queryByTestId('App-ingredient').childNodes[1].textContent).toBe('2020-11-25')
    // expect(queryByTestId('App-ingredient').childNodes[2]).toBe(true)
  })

  it('render checked ingredient', () => {
    const props = { ...ingredients[0], handlePickIngredient: () => ''};
    const { queryByTestId } = render(<IngredientList { ...props }/>);
    expect(queryByTestId('App-ingredient').firstElementChild.className).toBe('color-primary')
  })

  it('render unchecked ingredient', () => {
    const props = { ...ingredients[2], handlePickIngredient: () => ''};
    const { queryByTestId } = render(<IngredientList { ...props }/>);
    expect(queryByTestId('App-ingredient').firstElementChild.className).toBe('')
  })

})