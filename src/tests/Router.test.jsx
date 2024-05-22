import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  cleanup,
  render,
  screen,
  fireEvent,
  waitFor,
} from '@testing-library/react';
import Router from '../components/Router';
import Route from '../components/Route';
import Page404 from '../pages/Page404';
import { getCurrentPath } from '../utils/utils';
import { Link } from '../components/Link';

// Using 'vi' utility, to imitate (or "mock") a function so we can control
// the output of it.
// The first parameter is the file where the function is imported from.
vi.mock('../utils/utils.js', () => ({
  // To imitate a desired output we do it like this.
  //* getCurrentPath: () => '/'
  //* getCurrentPath: vi.fn().mockReturnValue('/'),

  // But im going to declare this mock as it is a 'vi function' so i can
  // return the value i want when performing a test.
  getCurrentPath: vi.fn(),
  navigate: vi.fn(),
}));

describe('Router', () => {
  // Before each test we clean up.
  beforeEach(() => {
    cleanup();
    vi.clearAllMocks();
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
    // Mocking this function to return the current path = '/about'.
    getCurrentPath.mockReturnValue('/about');

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

    render(<Router routes={routes} />);
    // If here we dont mock the path, test wont work because the shared 'routes' depends on the path,
    // we need a way to simulate that we are on a given path in order to display a given route component.
    // eg: to render = <h1>Home</h1> -> path = '/'
    expect(screen.getByText('About')).toBeTruthy();
  });

  it('Should navigate using Link', async () => {
    // This test is 'async' to handle the asynchronous nature of rendering and updating the DOM
    // when a user interactions occurs (such as navigation).
    getCurrentPath.mockReturnValueOnce('/');

    render(
      <Router>
        <Route
          path="/"
          Component={() => {
            return (
              <>
                <h1>Home</h1>
                <Link destination="/about">Go About</Link>
              </>
            );
          }}
        />

        <Route path="/about" Component={() => <h1>About</h1>} />
      </Router>
    );

    // To test the link i want to click on it to be redirected to '/about' page.
    const button = screen.getByText(/Go About/);
    // Simulates the click event on link, here i use regex.
    fireEvent.click(button);

    // Wait for the navigation to complete and the new content to be rendered.
    // Check that the URL has changed.
    await waitFor(() => {
      const aboutURL = getCurrentPath();

      expect(aboutURL).toBe('/about');
    });
  });
});
