import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { screen, render } from '@testing-library/react';
import NotFound from '../pages/NotFound';

function renderWithRouter(
  ui,
  { route = '/', history = createMemoryHistory({ initialEntries: [route] }) } = {},
) {
  return {
    ...render(<Router history={ history }>{ui}</Router>),
    history,
  };
}

describe('Teste o componente `<NotFound.js />', () => {
  renderWithRouter(<NotFound />);
  test(' Teste se a página contém `h2` com o texto `Page requested not found ', () => {
    expect(screen.getByRole('heading', { name: /Page requested not found/i, level: 2 }))
      .toBeInTheDocument();
  });
  test('Teste se a página mostra a imagem', () => {
    renderWithRouter(<NotFound />);
    expect(screen.getByAltText(/Pikachu crying because the page /i).src)
      .toEqual('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
