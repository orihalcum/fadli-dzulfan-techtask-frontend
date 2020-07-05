import React from 'react';
import { render, act } from '@testing-library/react';
import Lunch from './Lunch';

describe('renders correctly', () => {
  it('app container exist', () => {
    act(() => { 
      const { queryByTestId } = render(<Lunch />);
      expect(queryByTestId('App')).toBeInTheDocument();  
    })
  });
})