import Router from './components/Router';
import HomePage from './pages/Home';
import AboutPage from './pages/About';
import Page404 from './pages/Page404';
import SearchPage from './pages/Search';
import Route from './components/Route';

// What we are doing here is to optimize loading, or create a SPA, we are using the web history
// to get or return pages that already been loaded, that way the page getS loaded once.

function App() {
  return (
    <main>
      <Router defaultComponent={Page404}>
        <Route path="/" Component={HomePage} />
        <Route path="/about" Component={AboutPage} />
        <Route path="/search/:id/:search" Component={SearchPage} />
      </Router>
    </main>
  );
}

export default App;
