import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testa o componente Pokedex', () => {
  test('Se a página contém um heading h2 com o texto Encountered pokémons', () => {
    renderWithRouter(<App />);
    const title = screen
      .getByRole('heading', { level: 2, name: /Encountered pokémons/i });
    expect(title).toBeInTheDocument();
  });

  test('se é exibido o próximo pokémon da lista quando o botão é clicado', () => {
    renderWithRouter(<App />);
    const pokemons = [
      'Pikachu',
      'Charmander',
      'Caterpie',
      'Ekans',
      'Alakazam',
      'Mew',
      'Rapidash',
      'Snorlax',
      'Dragonair',
    ];
    const button = screen.getByRole('button', { name: /Próximo pokémon/i });
    const firstPokemon = screen.getByText(pokemons[0]);
    expect(firstPokemon).toBeInTheDocument();
    expect(button).toBeInTheDocument();
    const number = 7;
    pokemons.forEach((pokemon, index) => {
      if (index !== 0) {
        userEvent.click(button);
        expect(screen.getByText(pokemon)).toBeInTheDocument();
        expect(screen.getAllByTestId('pokemon-type-button')).toHaveLength(number);
      }
      if (index === pokemon.length - 1) {
        userEvent.click(button);
        expect(screen.getByText(pokemons[0])).toBeInTheDocument();
        expect(screen.getAllByTestId('pokemon-type-button')).toHaveLength(number);
      }
    });
  });

  test('Se é mostrado apenas um pokémon por vez', () => {
    renderWithRouter(<App />);
    const button = screen.getByRole('button', { name: /Próximo pokémon/i });
    const image = screen.getAllByRole('img');
    expect(image).toHaveLength(1);
    userEvent.click(button);
    expect(image).toHaveLength(1);
  });

  test('Se a Pokédex tem os botões de filtro.', () => {
    renderWithRouter(<App />);
    const types = [
      'Electric',
      'Fire',
      'Bug',
      'Poison',
      'Psychic',
      'Normal',
      'Dragon',
    ];
    types.forEach((type) => {
      const button = screen.getByRole('button', { name: type });
      expect(button).toBeInTheDocument();
    });

    const nextBtn = screen.getByRole('button', { name: /Próximo pokémon/i });
    const fireBtn = screen.getByRole('button', { name: /fire/i });
    const allBtn = screen.getByRole('button', { name: /all/i });

    expect(allBtn).toBeInTheDocument();
    userEvent.click(fireBtn);
    expect(allBtn).toBeInTheDocument();
    const firstFire = screen.getByText('Charmander');
    expect(firstFire).toBeInTheDocument();
    userEvent.click(nextBtn);
    expect(allBtn).toBeInTheDocument();
    const secondFire = screen.getByText('Rapidash');
    expect(secondFire).toBeInTheDocument();
    userEvent.click(nextBtn);
    expect(allBtn).toBeInTheDocument();
    expect(firstFire).toBeInTheDocument();
  });

  test('Se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);

    const pokemons = [
      'Pikachu',
      'Charmander',
      'Caterpie',
      'Ekans',
      'Alakazam',
      'Mew',
      'Rapidash',
      'Snorlax',
      'Dragonair',
    ];

    const allBtn = screen.getByRole('button', { name: /all/i });
    const nextBtn = screen.getByRole('button', { name: /Próximo pokémon/i });
    expect(allBtn).toBeInTheDocument();
    userEvent.click(allBtn);
    const firstPokemon = screen.getByText(pokemons[0]);
    expect(firstPokemon).toBeInTheDocument();
    pokemons.forEach((pokemon, index) => {
      if (index !== 0) {
        userEvent.click(nextBtn);
        expect(screen.getByText(pokemon)).toBeInTheDocument();
      }
      if (index === pokemons.length - 1) {
        userEvent.click(nextBtn);
        expect(screen.getByText(pokemons[0])).toBeInTheDocument(); //
      }
    });
  });
});
