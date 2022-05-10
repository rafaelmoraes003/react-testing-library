import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testa o componente Pokémon', () => {
  test('Se é renderizado um card com as informações de determinado pokémon.', () => {
    renderWithRouter(<App />);
    const pokemonTitle = screen.getByText(/pikachu/i);
    const pokemonType = screen.getAllByText(/electric/i);
    const pokemonTestId = screen.getByTestId('pokemon-type');
    const pokemonWeight = screen.getByText(/Average weight: 6.0 kg/i);
    const pokemonImage = screen.getByRole('img');
    expect(pokemonTitle).toBeInTheDocument();
    expect(pokemonType[0]).toBeInTheDocument();
    expect(pokemonWeight).toBeInTheDocument();
    expect(pokemonImage).toBeInTheDocument();
    expect(pokemonTestId).toHaveTextContent(/electric/i);
    expect(pokemonImage).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    expect(pokemonImage).toHaveAttribute('alt', 'Pikachu sprite');
  });

  test('Se contém um link de navegação para exibir detalhes', () => {
    renderWithRouter(<App />);
    const pokemonTitle = screen.getByText(/pikachu/i);
    expect(pokemonTitle).toBeInTheDocument();
    const moreDetails = screen.getByRole('link', { name: /more details/i });
    expect(moreDetails).toBeInTheDocument();
    expect(moreDetails).toHaveAttribute('href', '/pokemons/25');
  });

  test('Redirecionamento da aplicação para a página de detalhes de pokémon.', () => {
    const { history } = renderWithRouter(<App />);
    const moreDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(moreDetails);
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
  });

  test(' se existe um ícone de estrela nos pokémons favoritados.', () => {
    renderWithRouter(<App />);
    const imagesPrev = screen.getAllByRole('img');
    const moreDetails = screen.getByRole('link', { name: /more details/i });
    expect(imagesPrev).toHaveLength(1);
    userEvent.click(moreDetails);
    const favoritePokemon = screen.getByLabelText(/Pokémon favoritado?/i);
    expect(favoritePokemon).toBeInTheDocument();
    userEvent.click(favoritePokemon);
    const homeLink = screen.getByRole('link', { name: /home/i });
    userEvent.click(homeLink);
    const imagesAfter = screen.getAllByRole('img');
    expect(imagesAfter).toHaveLength(2);
    expect(imagesAfter[1]).toHaveAttribute('src', '/star-icon.svg');
    expect(imagesAfter[1]).toHaveAttribute('alt', 'Pikachu is marked as favorite');
  });
});
