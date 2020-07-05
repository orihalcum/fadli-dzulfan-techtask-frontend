import React from 'react';
import { render } from '@testing-library/react';
import AppContent from './AppContent';

test('app content exist', () => {
  const { queryByTestId, debug } = render(<AppContent />);
  expect(queryByTestId('App-content')).toBeInTheDocument();  
})