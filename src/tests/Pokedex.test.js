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
describe('Teste o componente `<Pokedex.js />', () => {
  test('Teste se a página contém um heading `h2` com `Encountered pokémons`', () => {});
  renderWithRouter(<App />);
  expect(screen.getByRole('heading', { name: /Encountered pokémons/i, level: 2 }))
    .toBeInTheDocument();
});

describe('O botão deve conter o texto `Próximo pokémon`', () => {
  test('próx pokémons devem ser mostrados,clicar sucessivamente no botão;', () => {
    renderWithRouter(<App />);
    expect(screen.getByText('Pikachu')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Próximo pokémon/i })).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /Próximo pokémon/i }));
    expect(screen.getByText(/charmander/i)).toBeInTheDocument();
  });
});
describe('Teste se é mostrado apenas um Pokémon por vez', () => {
  test('', () => {
    renderWithRouter(<App />);
    expect(screen.getAllByTestId('pokemon-name')).toHaveLength(1)
});
});
describe('Teste de a pokedex tem os botoes de filtro', () => {
  test('filtragem para cada tipo de pokemon', () => {
    renderWithRouter(<App />);
        expect(screen.getAllByTestId('pokemon-type-button')[0]).toBeInTheDocument();
      });
  });
  test('Pokedex deve circular somente por pokemons do msm tipo', () => {
    renderWithRouter(<App />);
    fireEvent.click(screen.getByRole('button', { name: /Psychic/i }));
    expect(screen.getByText(/alakazam/i)).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /próximo pokémon/i }));
    expect(screen.getByText(/mew/i)).toBeInTheDocument();
  });

  test('O botão All precisa estar sempre visível', () => {
    renderWithRouter(<App />);
    expect(screen.getByRole('button', { name: 'All' })).toBeInTheDocument();
  });

describe('Teste se a Pokédex contém um botão para resetar o filtro', () => {
  test('', () => {
    renderWithRouter(<App />);
    expect(screen.getByRole('button', {name: /all/i})).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: /all/i }));
    expect(screen.getByTestId('pokemon-name')).toHaveTextContent('Pikachu')
});
});
