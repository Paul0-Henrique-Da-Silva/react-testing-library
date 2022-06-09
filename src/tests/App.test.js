import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter, Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
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

describe('Teste o componente <App.js />', () => {
  test('O primeiro link deve possuir o texto Home', () => {
    render(<MemoryRouter><App /></MemoryRouter>);
    expect(screen.getByRole('link', { name: /Home/i })).toBeInTheDocument();
  });
  test('O segundo link deve possuir o texto About', () => {
    render(<MemoryRouter><App /></MemoryRouter>);
    expect(screen.getByRole('link', { name: /About/i })).toBeInTheDocument();
  });
  test('O terceiro link deve possuir o texto Favorite Pokémons', () => {
    render(<MemoryRouter><App /></MemoryRouter>);
    expect(screen.getByRole('link', { name: /Favorite Pokémons/i })).toBeInTheDocument();
  });
});
describe('Redirecionada p/ page inicial, na URL / ao clicar no link Home', () => {
  test('redirecionada para a página de About', () => {
    renderWithRouter(<App />);
    fireEvent.click(screen.getByRole('link', { name: /Home/i }));
    expect(screen.getByRole('link', { name: /Home/i })).toBeInTheDocument();
  });
  test('Redirecionada p/ page de `About`, na URL `/about`,clicarNoLink `About`', () => {
    renderWithRouter(<App />);
    fireEvent.click(screen.getByRole('link', { name: /About/i }));
    expect(screen.getByRole('link', { name: /About/i })).toBeInTheDocument();
  });
  test('R* p/ page`Pokémons Favoritados`,na URL`/favorites`,á`Favorite Pokémons`', () => {
    renderWithRouter(<App />);
    fireEvent.click(screen.getByRole('link', { name: /Favorite Pokémons/i }));
    expect(screen.getByRole('link', { name: /Favorite Pokémons/i })).toBeInTheDocument();
  });
});
