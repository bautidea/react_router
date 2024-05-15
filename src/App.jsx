import Router from './components/Router';
import HomePage from './pages/Home';
import AboutPage from './pages/About';
import Page404 from './pages/Page404';
import SearchPage from './pages/Search';

// What we are doing here is to optimize loading, or create a SPA, we are using the web history
// to get or return pages that already been loaded, that way the page getS loaded once.

// This constant will declare the routes.
const routes = [
  {
    path: '/',
    Component: HomePage,
  },
  {
    path: '/about',
    Component: AboutPage,
  },
  {
    path: '/search/:id/:search',
    Component: SearchPage,
  },
];

function App() {
  return (
    <main>
      <Router routes={routes} defaultComponent={Page404} />
    </main>
  );
}

export default App;
