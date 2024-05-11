import { useEffect, useState } from 'react';

// What we are doing here is to optimize loading, or create a SPA, we are using the web history
// to get or return pages that already been loaded, that way the page get loaded once.

// Constant for the Event.
const NAVIGATION_EVENT = 'pushState';

// The Best from to perform a SPA, is by creating a function called 'navigate' that takes 'href' as a
// parameter.
function navigate(href) {
  // Here we use the 'history' property, provides a form of manipulating browser history (pages visited).
  // Then  we use the 'pushState()' method of 'history' to add an entry to the browser session.
  // We perform this to change the URL, but we dont refresh the page, we just update the URL.
  window.history.pushState({}, '', href);

  // Creating a custom Event to warn, that i've changed the URL, because there isn't a native way for us
  // to hear the '.pushState()' event (we can't hear a navigation when going forward)
  // In JS we can create custom events like this to hear when a navigation goes backward.
  const navigationEvent = new Event(NAVIGATION_EVENT); // Creating the event.

  // Now i have to sent the event.
  window.dispatchEvent(navigationEvent); // Dispatching event so a listener can grab it.
}

function HomePage() {
  return (
    <>
      <h1>Home</h1>
      <p>
        This is a example page to be used for creating React Router from scratch
      </p>
      <button onClick={() => navigate('/about')}>About Me</button>
    </>
  );
}

function AboutPage() {
  return (
    <>
      <h1>About</h1>
      <p>Creating a clone of React Router</p>
      <button onClick={() => navigate('/')}>Home</button>
    </>
  );
}

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
    window.addEventListener(NAVIGATION_EVENT, onLocationChange);
    // We need to add a listener for 'popstate', this is an event that dispatch the browser
    // when clicking the 'go back'  button.
    window.addEventListener('popstate', onLocationChange);

    return () => {
      window.removeEventListener(NAVIGATION_EVENT, onLocationChange);
      window.removeEventListener('popstate', onLocationChange);
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
