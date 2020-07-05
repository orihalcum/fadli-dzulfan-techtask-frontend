import React from 'react';
import { render, act } from '@testing-library/react';
import AppContainer from './AppContainer';

test('app container exist', () => {
  act(() => {
    const { queryByTestId } = render(<AppContainer />);
    expect(queryByTestId('App-container')).toBeInTheDocument();  
  });
})