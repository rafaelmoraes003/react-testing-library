import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('testa o componente App', () => {
  test('Teste se o topo da aplicação contém um conjunto de links de navegação', () => {
    renderWithRouter(<App />);
    const links = ['Home', 'About', 'Favorite Pokémons'];
    links.forEach((link) => {
      const myLinks = screen.getByRole('link', { name: link });
      expect(myLinks).toBeInTheDocument();
    });
  });

  test('Aplicação é redirecionada para a página inicial - URL /', () => {
    const history = renderWithRouter(<App />);
    const { pathname } = history.history.location;
    const homeLink = screen.getByRole('link', { name: /home/i });
    expect(homeLink).toBeInTheDocument();
    expect(pathname).toBe('/');
    userEvent.click(homeLink);
    expect(pathname).toBe('/');
  });

  test('Aplicação é redirecionada para a página About - URL /about', () => {
    const { history } = renderWithRouter(<App />);
    const aboutLink = screen.getByRole('link', { name: /about/i });
    expect(aboutLink).toBeInTheDocument();
    userEvent.click(aboutLink);
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  test('Aplicação é redirecionada para a página de Pokémons Favoritados ', () => {
    const { history } = renderWithRouter(<App />);
    const favoriteLink = screen.getByRole('link', { name: /favorite pokémons/i });
    expect(favoriteLink).toBeInTheDocument();
    userEvent.click(favoriteLink);
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });

  test('Aplicação é redirecionada para a página Not Found - URL desconhecida', () => {
    const { history } = renderWithRouter(<App />);
    history.push('xxxx');
    const notFound = screen.getByText('Page requested not found');
    expect(notFound).toBeInTheDocument();
  });
});
