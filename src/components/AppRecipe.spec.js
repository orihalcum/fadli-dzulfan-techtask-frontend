import React from 'react';
import { render } from '@testing-library/react';
import { AppRecipe, RecipeList } from './AppRecipe';

describe('render recipes correctly', () => {

  const recipes = [{
    title: 'Salad',
    image: 'https://www.onceuponachef.com/images/2019/07/Big-Italian-Salad-1200x1553.jpg',
    ingredients: []
  },
  {
    title: 'Hotdog',
    image: '',
    ingredients: []
  }]

  it('app content recipes exist and show the right title', () => {
    const { queryByTestId } = render(<AppRecipe />);
    const AppContentRecipes = queryByTestId('App-content-recipes');
    expect(AppContentRecipes).toBeInTheDocument();
    expect(AppContentRecipes.children[0].textContent).toBe('Recomended Recipes');
  })

  it('app recipes list exist', () => {
    const { queryByTestId } = render(<AppRecipe />);
    expect(queryByTestId('App-content-recipes-list')).toBeInTheDocument();
  })

  it('showing recipes', () => {
    const props = { recipes, viewDetail: () => ''};
    const { container } = render(<AppRecipe { ...props }/>);
    const AppRecipeNodes = container.querySelectorAll('.App-recipe')
    expect(AppRecipeNodes.length).toBe(recipes.length)
  })

  it('showing recipe image on recipes', () => {
    const props = { ...recipes[0], viewDetail: () => ''};
    const { queryByTestId } = render(<RecipeList { ...props }/>);
    expect(queryByTestId('App-recipe')).toHaveStyle('background-image: url(https://www.onceuponachef.com/images/2019/07/Big-Italian-Salad-1200x1553.jpg);')
  })

})