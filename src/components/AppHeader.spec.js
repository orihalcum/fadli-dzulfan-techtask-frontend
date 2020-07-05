import React from 'react';
import { render } from '@testing-library/react';
import AppHeader from './AppHeader';
import moment from 'moment'

describe('render header components correctly', () => {

  describe('render menu components correctly', () => {

    it('app menu exist', () => {
      const { queryByTestId } = render(<AppHeader />);
      const AppMenu = queryByTestId('App-menu');
      expect(AppMenu).toBeInTheDocument();
    })

    it('choose the right icon for sider', () => {
      const { queryByTestId } = render(<AppHeader />);
      const AppMenuToggleAside = queryByTestId('App-menu-toggle-aside');
      expect(AppMenuToggleAside).toBeInTheDocument();
    })
  
    it('show correct initial date', () => {
      const { queryByTestId } = render(<AppHeader />);
      const AppMenuDate = queryByTestId('App-menu-date');
      expect(AppMenuDate.textContent).toBe(moment(new Date()).format('dddd, LL'))
    })

    it('choose the right icon for datepicker', () => {
      const { queryByTestId } = render(<AppHeader />);
      const AppMenuCalendar = queryByTestId('App-menu-calendar');
      expect(AppMenuCalendar).toBeInTheDocument();
    })

  })

  it('app header exist', () => {
    const { queryByTestId } = render(<AppHeader />);
    expect(queryByTestId('App-header')).toBeInTheDocument();
  })

  it('show correct greetings', () => {
    const { queryByTestId } = render(<AppHeader />);
    const AppHeaderGreetings = queryByTestId('App-header-greetings');
    expect(AppHeaderGreetings.textContent).toBe('Hello, what would you like to eat today?');
  })

})
