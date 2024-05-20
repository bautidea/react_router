import { describe, it, expect, beforeEach } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import Router from '../components/Router';
import Page404 from '../pages/Page404';

describe('Router', () => {
  // Before each test we clean up.
  beforeEach(() => {
    cleanup();
  });

  it('Should render when no routes are passed', () => {
    // Testing if component is rendered when no routes are passed.
    render(<Router routes={[]} />);
    expect(true).toBeTruthy();
  });

  it('Should render 404 if no routes match', () => {
    render(<Router routes={[]} defaultComponent={Page404} />);
    // Here we have to specify the same text as is contained by <h1>,
    // if i would write only '404' then i would get an error, and test would fail.
    expect(screen.getByText('Error: 404 - Page not Found')).toBeTruthy();
  });

  it('Should render the component of the first route that matches', () => {
    const routes = [
      {
        path: '/',
        Component: () => <h1>Home</h1>,
      },
      {
        path: '/about',
        Component: () => <h1>About</h1>,
      },
    ];
  });
});
