import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import { About } from '../components';

describe('Testa o componente About', () => {
  test('Se a página contém um heading h2 com o texto About Pokédex', () => {
    renderWithRouter(<About />);
    const pokedexHeading = screen
      .getByRole('heading', { level: 2, name: /About Pokédex/i });
    expect(pokedexHeading).toBeInTheDocument();
  });

  test('Se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
    renderWithRouter(<About />);
    const p1 = screen.getByText(/This application simulates a Pokédex.../i);
    const p2 = screen.getByText(/...see more details for each one of them/i);
    expect(p1).toBeInTheDocument();
    expect(p2).toBeInTheDocument();
  });

  test('Se a página contém imagem de uma Pokédex', () => {
    renderWithRouter(<About />);
    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
