import { useState } from 'react';

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
  const navigationEvent = new Event('pushState');

  // Now i have to sent the event.
  window.dispatchEvent(navigationEvent);
}

function HomePage() {
  return (
    <>
      <h1>Home</h1>
      <p>
        This is a example page to be used for creating React Router from scratch
      </p>
      <a href="/about">About Me</a>
    </>
  );
}

function AboutPage() {
  return (
    <>
      <h1>About</h1>
      <p>Creating a clone of React Router</p>
      <a href="/">Home</a>
    </>
  );
}

function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  console.log(currentPath);
  return (
    <main>
      {currentPath === '/' && <HomePage />}
      {currentPath === '/about' && <AboutPage />}
    </main>
  );
}

export default App;
