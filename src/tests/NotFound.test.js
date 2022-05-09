import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import { NotFound } from '../components';

describe('Testa o componente NotFound', () => {
  test('se a página contém um heading h2 com o texto Page requested not found', () => {
    renderWithRouter(<NotFound />);
    const title = screen
      .getByRole('heading', { level: 2, name: /Page requested not found/i });
    expect(title).toBeInTheDocument();
  });

  test('Se a página mostra a imagem', () => {
    renderWithRouter(<NotFound />);
    const image = screen.getAllByRole('img');
    expect(image[1]).toBeInTheDocument();
    expect(image[1]).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
    expect(image[1])
      .toHaveAttribute('alt', 'Pikachu crying because the page requested was not found');
  });
});
