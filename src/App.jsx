import HomePage from './pages/Home';
import AboutPage from './pages/About';
import Router from './components/Router';
import Page404 from './pages/Page404';

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
];

function App() {
  return (
    <main>
      <Router routes={routes} defaultComponent={Page404} />
    </main>
  );
}

export default App;
