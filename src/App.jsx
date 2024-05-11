import { useEffect, useState } from 'react';
import { EVENTS } from './events';
import HomePage from './pages/Home';
import AboutPage from './pages/About';

// What we are doing here is to optimize loading, or create a SPA, we are using the web history
// to get or return pages that already been loaded, that way the page getS loaded once.

function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    // We are going to subscribe to pushState event.
    const onLocationChange = () => {
      // Changing the state to the previous page, if it was '/' -> '/about'
      // or '/about' -> '/'.
      setCurrentPath(window.location.pathname);
    };

    // When event get dispatched it will set the state of current path to be
    // the previous one.
    window.addEventListener(EVENTS.NAVIGATION_EVENT, onLocationChange);
    // We need to add a listener for 'popstate', this is an event that dispatch the browser
    // when clicking the 'go back'  button.
    window.addEventListener(EVENTS.POPSTATE, onLocationChange);

    return () => {
      window.removeEventListener(EVENTS.NAVIGATION_EVENT, onLocationChange);
      window.removeEventListener(EVENTS.POPSTATE, onLocationChange);
    };
  }, []);

  console.log(currentPath);

  return (
    <main>
      {currentPath === '/' && <HomePage />}
      {currentPath === '/about' && <AboutPage />}
    </main>
  );
}

export default App;
