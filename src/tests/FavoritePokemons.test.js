import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import FavoritePokemons from '../pages/FavoritePokemons';
import App from '../App';

function renderWithRouter(
  ui,
  { route = '/', history = createMemoryHistory({ initialEntries: [route] }) } = {},
) {
  return {
    ...render(<Router history={ history }>{ui}</Router>),
    history,
  };
}
describe('Teste o componente <FavoritePokemons.js />', () => {
  test('Teste se é exibida na tela a mensagem `No favorite pokemon found`', () => {
    render(<FavoritePokemons />);
    expect(screen.getByText('No favorite pokemon found')).toBeInTheDocument();
  });
});

test('Teste se são exibidos todos os cards de pokémons favoritados', () => {
  renderWithRouter(<App />);
  fireEvent.click(screen.getByRole('link', { name: /more details/i }));
  fireEvent.click(screen.getByLabelText(/pokémon favoritado/i));
  fireEvent.click(screen.getByRole('link', { name: /favorite pokémons/i }));
  expect(screen.getByText(/average weight/i)).toBeInTheDocument();
});
