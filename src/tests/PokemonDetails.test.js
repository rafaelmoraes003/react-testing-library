import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

const prevNumber = 3;
const afterNumber = 4;

describe('Testa o componente Pokemon Details', () => {
  test('Se as informações do pokémon selecionado são mostradas na tela', () => {
    const { history } = renderWithRouter(<App />);
    const moreDetails = screen.getByRole('link', { name: /more details/i });
    expect(moreDetails).toBeInTheDocument();
    userEvent.click(moreDetails);
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
    const pokemonTitle = screen
      .getByRole('heading', { level: 2, name: /pikachu details/i });
    expect(pokemonTitle).toBeInTheDocument();
    expect(moreDetails).not.toBeInTheDocument();
    const summary = screen.getByRole('heading', { name: /summary/i });
    expect(summary).toBeInTheDocument();
    const infoParagraph = screen.getByText(/This intelligent Pokémon.../i);
    expect(infoParagraph).toBeInTheDocument();
  });

  test('Se existe na página uma seção com os mapas', () => {
    renderWithRouter(<App />);
    const moreDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(moreDetails);
    const locations = screen
      .getByRole('heading', { level: 2, name: /Game Locations of Pikachu/i });
    expect(locations).toBeInTheDocument();
    const images = screen.getAllByRole('img');
    const firstLocation = screen.getByText(/Kanto Viridian Forest/i);
    const secondLocation = screen.getByText(/Kanto Power Plant/i);
    expect(images).toHaveLength(prevNumber); // contando com a imagem do pokémon
    expect(images[1]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(images[1]).toHaveAttribute('alt', 'Pikachu location');
    expect(images[2]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
    expect(images[2]).toHaveAttribute('alt', 'Pikachu location');
    expect(firstLocation).toBeInTheDocument();
    expect(secondLocation).toBeInTheDocument();
  });

  test('Se o usuário pode favoritar um pokémon através da página de detalhes.', () => {
    renderWithRouter(<App />);
    const moreDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(moreDetails);
    const favorite = screen.getByLabelText(/Pokémon favoritado?/i);
    const checkbox = screen.getByRole('checkbox');
    expect(favorite).toBeInTheDocument();
    expect(favorite).toBe(checkbox);
  });

  test('Adicionar e remover favoritado', () => {
    renderWithRouter(<App />);
    const moreDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(moreDetails);
    const favorite = screen.getByLabelText(/Pokémon favoritado?/i);
    expect(screen.getAllByRole('img')).toHaveLength(prevNumber);
    userEvent.click(favorite);
    expect(screen.getAllByRole('img')).toHaveLength(afterNumber);
    userEvent.click(favorite);
    expect(screen.getAllByRole('img')).toHaveLength(prevNumber);
  });
});
