import { useState, useEffect } from 'react';
import { EVENTS } from '../events';

export default function Router({
  routes = [],
  defaultComponent: DefaultComponent = () => null,
}) {
  // Here we are passing two defaults values, an empty array (when routes are not passed)
  // and a default function (if a component is not passed).

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

  // In order to find which component is going to be rendered, we need to see which route matches.
  // We compare if the 'currentPath' (the path we are in browser) is equal to one of the paths
  // passed in the 'routes' array, if 'path' and 'currentPath' matches, we obtain the property
  // 'Component' from 'routes' array.
  const Page = routes.find(({ path }) => path === currentPath)?.Component;

  // If the path isn't found we return the DefaultComponent.
  return Page ? <Page /> : <DefaultComponent />;
}
