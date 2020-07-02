import React from 'react';
import { render } from '@testing-library/react';
import Lunch from './Lunch';

test('renders learn react link', () => {
  const { getByText } = render(<Lunch />);
  // const linkElement = getByText(/learn react/i);
  // expect(linkElement).toBeInTheDocument();
});
