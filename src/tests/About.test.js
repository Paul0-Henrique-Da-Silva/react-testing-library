const { render, screen } = require("@testing-library/react");
import About from '../pages/About'

test('Teste o componente <About.js />', () => {
    render(<About />)
    const pokeTitleEl = screen.getByRole('heading', { name: /About Pokédex/i , level:2 } );
    
    expect(pokeTitleEl).toBeInTheDocument();
});
