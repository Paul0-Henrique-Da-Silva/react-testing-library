const { render, screen } = require("@testing-library/react");
import About from '../pages/About'

describe('Teste o componente <About.js />.', () => {
test('Teste se a página contém as informações sobre a Pokédex',() => {
    render(<About />)    
    expect(screen.getByText(/About Pokédex/i)).toBeInTheDocument()
})

test('Teste se a página contém um heading h2 com o texto About Pokédex;', () => {
    render(<About />)    
    expect(screen.getByRole('heading', { name: /About Pokédex/i , level:2 } ))
    .toBeInTheDocument();
});
test('Teste se a página contém dois parágrafos com texto sobre a Pokédex',() => {
    render(<About />)
    expect(screen.getByText('This application simulates a Pokédex, a digital encyclopedia containing all Pokémons'))
    .toBeInTheDocument()
    expect(screen.getByText('One can filter Pokémons by type, and see more details for each one of them'))
    .toBeInTheDocument()
});
test('Teste se a página contém a seguinte imagem de uma Pokédex',() => {
    const url = 'https://cdn2.bulbagarden.net//thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png'
    expect(screen.getByRole('img', {name: /Pokédex/i})).toHaveAttribute('src', url) 
})
})