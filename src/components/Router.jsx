import { useState, useEffect } from 'react';
import { EVENTS } from '../events';
import { match } from 'path-to-regexp';

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

  let routeParams = {};

  // In order to find which component is going to be rendered, we need to see which route matches.
  // We compare if the 'currentPath' (the path we are in browser) is equal to one of the paths
  // passed in the 'routes' array, if 'path' and 'currentPath' matches, we obtain the property
  // 'Component' from 'routes' array.
  const Page = routes.find(({ path }) => {
    if (path === currentPath) return true;

    // Using 'path-to-regexp' to detect dynamic routes.
    // 'match' will return a function for transforming paths into parameters.
    // It takes a decoder to unify strings format.
    const matchUrl = match(path, { decode: decodeURIComponent });

    // checking if the currentPath matches the 'path' in '.find()'
    const matched = matchUrl(currentPath);

    // If it doesnt match then we return false and return 'DefaultComponent'.
    if (!matched) return false;

    // If the path match then we retrieve the params that are declared on the URL.
    // like -> /about/:id/:search | we retrieve -> { id : 'value', search : 'value' }
    routeParams = matched.params;
    return true; // .find() method need a return false or true.
  })?.Component;

  // If the path isn't found we return the DefaultComponent.
  // We inject routeParams to 'Page' and 'DefaultComponent' (we might do something with these params
  // in the default component).
  return Page ? (
    <Page routeParams={routeParams} />
  ) : (
    <DefaultComponent routeParams={routeParams} />
  );
}
