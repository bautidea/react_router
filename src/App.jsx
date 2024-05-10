import { useState } from 'react';

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

  return (
    <main>
      {currentPath === '/' && <HomePage />}
      {currentPath === '/about' && <AboutPage />}
    </main>
  );
}

export default App;
