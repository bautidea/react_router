import { Suspense, lazy } from 'react';
import Router from './components/Router';
import Route from './components/Route';

// Lazy Load of routes.
// When we use 'lazy' to render a dynamic component, we have to specify to react
// that there is a part of the UI that wont be available from start.
// If we dont do this we'll get an error when trying to render the declared pages from below.
// To solve this we need to use a react Component called <Suspense>, we need to wrap the code
// that wont be available from beginning.
const HomePage = lazy(() => import('./pages/Home.jsx'));
const AboutPage = lazy(() => import('./pages/About.jsx'));
const Page404 = lazy(() => import('./pages/Page404.jsx'));
const SearchPage = lazy(() => import('./pages/Search.jsx'));

function App() {
  return (
    <main>
      {/* 
        Wrapping component with 'Suspense' to use lazy load. 
        This component can take a fallback function in which we can indicate that,
      if there is a part of the UI that is suspended or not available, it will
      render something meanwhile the components is loaded.
      */}
      <Suspense fallback={<div>Loading...</div>}>
        <Router defaultComponent={Page404}>
          <Route path="/" Component={HomePage} />
          <Route path="/:lang?/about" Component={AboutPage} />
          <Route path="/search/:id/:search" Component={SearchPage} />
        </Router>
      </Suspense>
    </main>
  );
}

export default App;
