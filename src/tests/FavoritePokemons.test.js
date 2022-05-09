import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import { FavoritePokemons } from '../components';
import App from '../App';

describe('Testa o componente Favorite Pokemons', () => {
  test('se é exibida na tela a mensagem No favorite pokemon found', () => {
    renderWithRouter(<FavoritePokemons />);
    const noPokemons = screen.getByText('No favorite pokemon found');
    expect(noPokemons).toBeInTheDocument();
  });

  test('Teste se são exibidos todos os cards de pokémons favoritados.', () => {
    const { history } = renderWithRouter(<App />);
    const moreDetails = screen.getByText('More details');
    expect(moreDetails).toBeInTheDocument();
    userEvent.click(moreDetails);
    const favorite = screen.getByLabelText('Pokémon favoritado?');
    expect(favorite).toBeInTheDocument();
    userEvent.click(favorite);
    const link = screen.getByRole('link', { name: /Favorite Pokémons/i });
    userEvent.click(link);
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
    const imgs = screen.getAllByRole('img');
    expect(imgs).toHaveLength(2); // imagem do  pokémon e da estrela de favoritado
  });
});
