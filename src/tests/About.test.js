import About from '../pages/About';

const { render, screen } = require('@testing-library/react');

describe('Teste o componente <About.js />.', () => {
  test('Teste se a página contém as informações sobre a Pokédex', () => {
    render(<About />);
    expect(screen.getByText(/About Pokédex/i)).toBeInTheDocument();
  });

  test('Teste se a página contém um heading h2 com o texto About Pokédex;', () => {
    render(<About />);
    expect(screen.getByRole('heading', { name: /About Pokédex/i, level: 2 }))
      .toBeInTheDocument();
  });
  test('Teste se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    render(<About />);
    const tagP1 = 'This application simulates a Pokédex,'
    + ' a digital encyclopedia containing all Pokémons';
    const tagP2 = 'One can filter Pokémons by type,'
    + ' and see more details for each one of them';
    expect(screen.getByText(tagP1))
      .toBeInTheDocument();
    expect(screen.getByText(tagP2))
      .toBeInTheDocument();
  });
  test('Teste se a página contém a seguinte imagem de uma Pokédex', () => {
    render(<About />);
    const url = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    expect(screen.getByRole('img')).toHaveAttribute('src', url);
  });
});
