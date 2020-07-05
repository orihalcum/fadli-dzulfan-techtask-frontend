import React from 'react';
import { render } from '@testing-library/react';
import Lunch from './Lunch';
import moment from 'moment'

describe('renders correctly', () => {
  
  it('app container exist', () => {
    const { queryByTestId } = render(<Lunch />);
    const AppContainer = queryByTestId('App-container');
    expect(AppContainer).toBeInTheDocument();  
  });
  
  describe('render header components correctly', () => {

    describe('render menu components correctly', () => {

      it('app menu exist', () => {
        const { queryByTestId } = render(<Lunch />);
        const AppMenu = queryByTestId('App-menu');
        expect(AppMenu).toBeInTheDocument();
      })

      it('choose the right icon for sider', () => {
        const { queryByTestId } = render(<Lunch />);
        const AppMenuToggleAside = queryByTestId('App-menu-toggle-aside');
        expect(AppMenuToggleAside).toBeInTheDocument();
      })
    
      it('show correct initial date', () => {
        const { queryByTestId } = render(<Lunch />);
        const AppMenuDate = queryByTestId('App-menu-date');
        expect(AppMenuDate.textContent).toBe(moment(new Date()).format('dddd, LL'))
      })

      it('choose the right icon for datepicker', () => {
        const { queryByTestId } = render(<Lunch />);
        const AppMenuCalendar = queryByTestId('App-menu-calendar');
        expect(AppMenuCalendar).toBeInTheDocument();
      })


    })

    it('app header exist', () => {
      const { queryByTestId } = render(<Lunch />);
      const AppHeader = queryByTestId('App-header');
      expect(AppHeader).toBeInTheDocument();
    })

    it('show correct greetings', () => {
      const { queryByTestId } = render(<Lunch />);
      const AppHeaderGreetings = queryByTestId('App-header-greetings');
      expect(AppHeaderGreetings.textContent).toBe('Hello, what would you like to eat today?');
    })

  })

  describe('render content components correctly', () => {

    it('app content exist', () => {
      const { queryByTestId } = render(<Lunch />);
      const AppContent = queryByTestId('App-content');
      expect(AppContent).toBeInTheDocument();  
    })

    it('app content recipes exist and show the right title', () => {
      const { queryByTestId } = render(<Lunch />);
      const AppContentRecipes = queryByTestId('App-content-recipes');
      expect(AppContentRecipes).toBeInTheDocument();
      expect(AppContentRecipes.children[0].textContent).toBe('Recomended Recipes');
    })

    it('app content ingredients exist and show the right title', () => {
      const { queryByTestId } = render(<Lunch />);
      const AppContentIngredients = queryByTestId('App-content-ingredients');
      expect(AppContentIngredients).toBeInTheDocument();
      expect(AppContentIngredients.children[0].textContent).toBe('Available Ingredients ');
    })

  })

})