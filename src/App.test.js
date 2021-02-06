import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders list', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/Ładuję dane/i);
  expect(linkElement).toBeInTheDocument();
});
