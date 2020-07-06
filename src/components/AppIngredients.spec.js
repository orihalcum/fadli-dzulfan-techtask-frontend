import React from 'react';
import { render, act, fireEvent } from '@testing-library/react';
import { AppIngredients, IngredientList } from './AppIngredients';
import { AppModalRecomendationRecipe } from './AppModal'

const ingredients = [{
  title: "Ham",
  "use-by": "2020-11-25",
  checked: false
},
{
  title: "Cheese",
  "use-by": "2020-11-10",
  checked: false
},
{
  title: "Sausage",
  "use-by": "2020-11-01",
  checked: false
}]

const recipes = [
  {
    title: 'Salad',
    image: 'https://www.onceuponachef.com/images/2019/07/Big-Italian-Salad-1200x1553.jpg',
    ingredients: [
      {
        title: "Ham",
        "use-by": "2020-11-25",
      }
    ]
  }
]

describe('render ingredients correctly', () => {

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
    expect(AppIngredientsNodes.length).toBe(ingredients.length)
  })

  it('filtered ingredients using use-by', () => {
    const props = { 
      ingredients: [{
        title: "Ham",
        "use-by": "2020-11-25",
        checked: false
      },
      {
        title: "Cheese",
        "use-by": "2020-11-10",
        checked: false
      },
      {
        title: "Sausage",
        "use-by": "2020-01-01",
        checked: false
      }], 
      showModalRecomendationRecipe: true, 
      handlePickIngredient: () => ''
    };
    const { container } = render(<AppIngredients { ...props }/>);
    const AppIngredientsNodes = container.querySelectorAll('.App-ingredient')
    expect(AppIngredientsNodes.length).toBe(ingredients.length-1)
  })

  it('showing text no ingredient', () => {
    const props = { 
      ingredients: [], 
      showModalRecomendationRecipe: false, 
      handlePickIngredient: () => ''
    };
    const { container, queryByTestId } = render(<AppIngredients { ...props }/>);
    const AppIngredientsNodes = container.querySelectorAll('.App-ingredient')
    expect(AppIngredientsNodes.length).toBe(0)
    expect(queryByTestId('App-content-ingredients-list').textContent).toBe('No available ingredients');
  })

  it('render first ingredients correctly', () => {
    const props = { ...ingredients[0], handlePickIngredient: () => ''};
    const { queryByTestId } = render(<IngredientList { ...props }/>);
    expect(queryByTestId('App-ingredient').firstElementChild.textContent).toBe('Ham')
    expect(queryByTestId('App-ingredient').childNodes[0].textContent).toBe('Ham')
    expect(queryByTestId('App-ingredient').childNodes[1].textContent).toBe('2020-11-25')
    // expect(queryByTestId('App-ingredient').childNodes[2]).toBe(true)
  })

  it('render unchecked ingredient', () => {
    const props = { ...ingredients[2], handlePickIngredient: () => ''};
    const { queryByTestId } = render(<IngredientList { ...props }/>);
    expect(queryByTestId('App-ingredient').firstElementChild.className).toBe('')
  })


  it('render checked ingredient', () => {
    let data = { ...ingredients }
    data[0]['checked'] = true
    const props = { ...data[0], handlePickIngredient: () => ''};
    const { queryByTestId } = render(<IngredientList { ...props }/>);
    expect(queryByTestId('App-ingredient').firstElementChild.className).toBe('color-primary')
  })

})

describe('showing modal recomendation correctly', () => {

  const props = {
    recomendation: recipes,
    showDetailRecomendationRecipe: () => '',
    setShowDetailRecomendationRecipe: () => '',
    showModalRecomendationRecipe: true,
    viewDetailRecipe: () => ''
  }

  it('showing modal correctly', () => {
    const { container } = render(<AppModalRecomendationRecipe { ...props }/>);
    const AppNodes = container.querySelector('.App-modal-floating')
    expect(AppNodes.className).toBe('App-modal App-modal-floating show')
  })

  it('showing title correctly', () => {
    const { queryByTestId } = render(<AppModalRecomendationRecipe { ...props }/>);
    expect(queryByTestId('App-modal-floating-title').textContent).toBe(`Recomendation Recipes (${props.recomendation.length}) `)
  })

  it('render recipe sugestion list correctly', () => {
    const { container } = render(<AppModalRecomendationRecipe { ...props }/>);
    const AppNodes = container.querySelectorAll('.recomendation-recipe-item')
    expect(AppNodes.length).toBe(props.recomendation.length)
  })

})

describe('modal not showing correctly', () => {

  const props = {
    recomendation: [],
    showDetailRecomendationRecipe: () => '',
    setShowDetailRecomendationRecipe: () => '',
    showModalRecomendationRecipe: false,
    viewDetailRecipe: () => ''
  }

  it('hide modal correctly', () => {
    const { container } = render(<AppModalRecomendationRecipe { ...props }/>);
    const AppNodes = container.querySelector('.App-modal-floating')
    expect(AppNodes.className).toBe('App-modal App-modal-floating ')
  })

})

// describe('event click checkbox ingredients', () => {

//   let data = Object.assign({}, ingredients)

//   const props = { 
//     ingredients, 
//     showModalRecomendationRecipe: data.filter(item => item.checked).length > 0, 
//     handlePickIngredient: (value, index) => {
//       data[index]['checked'] = value
//     }
//   };
//   // const { container } = render(<AppIngredients { ...props }/>);
//   // const AppNodes = container.querySelectorAll('.recomendation-recipe-item')
//   // const checkbox = AppNodes[0].childNodes[2]


// })