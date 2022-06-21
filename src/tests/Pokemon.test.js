import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { screen, render, fireEvent } from '@testing-library/react';
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
describe('Teste o componente `<Pokemon.js />`', () => {
  test('Teste se é renderizado um card com as informações de determinado pokémon', () => {
    renderWithRouter(<App />);
    // expect(screen.getByTestId('pokemon-type')).toBeInTheDocument();
    expect(screen.getByTestId('pokemon-type')).toHaveTextContent('Electric');
    expect(screen.getByTestId('pokemon-name')).toBeInTheDocument();
    expect(screen.getByText(/pikachu/i)).toBeInTheDocument();
    expect(screen.getByTestId('pokemon-weight')).toBeInTheDocument();
    expect(screen.getByAltText(/Pikachu sprite/i)).toBeInTheDocument();
    expect(screen.getByRole('img', { name: /Pikachu sprite/i }).src)
      .toEqual('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png');
  });
});
test('Pokédex contém um link de navegação para exibir detalhes', () => {
  renderWithRouter(<App />);
  expect(screen.getByRole('link', { name: /more details/i })).toBeInTheDocument();
});
test('URL exibida no navegador muda para /pokemon/<id>, onde <id> ', () => {
  const { history } = renderWithRouter(<App />);
  fireEvent.click(screen.getByRole('link', { name: /more details/i }));
  expect(history.location.pathname).toBe('/pokemons/25');
});

test('Teste se existe um ícone de estrela nos pokémons favoritados:', () => {
  renderWithRouter(<App />);
  // expect(screen.getByRole('link', { name: /more details/i })).toBeInTheDocument();
  fireEvent.click(screen.getByRole('link', { name: /more details/i }));
  expect(screen.getByRole('checkbox')).toBeInTheDocument();
  fireEvent.click(screen.getByRole('checkbox'));
  expect(screen.getByRole('img', { name: /Pikachu is marked as favorite/i }).src)
    .toBe('http://localhost/star-icon.svg');
});
