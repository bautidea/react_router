import { useState, useEffect, Children } from 'react';
import { EVENTS } from './events';
import { match } from 'path-to-regexp';
import { getCurrentPath } from './utils';

export default function Router({
  children,
  routes = [],
  defaultComponent: DefaultComponent = () => null,
}) {
  // Here we are passing two defaults values, an empty array (when routes are not passed)
  // and a default function (if a component is not passed).

  const [currentPath, setCurrentPath] = useState(getCurrentPath());

  useEffect(() => {
    // We are going to subscribe to pushState event.
    const onLocationChange = () => {
      // Changing the state to the previous page, if it was '/' -> '/about'
      // or '/about' -> '/'.
      setCurrentPath(getCurrentPath());
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

  // From <Route> children component we are obtaining the routes and their components.
  // 'Children' is imported from react and lets us manipulate and transform the JSX
  // that is received as a 'children' prop.
  // When mapping Children we have two parameters:
  //    children -> contains all elements that are passed as children.
  //    child -> represents each individual child element within 'children'.
  const routeFromChildren = Children.map(children, (child) => {
    // From child object we are obtaining, child Component name ('Route') and
    // the props from it -> { path , Component }
    const { props, type } = child;
    const { name } = type;

    // We check if the children name Component is Route.
    const isRoute = name === 'Route';

    // If the child is 'Route' we return the property 'props' which has all
    // children props as an object like -> { path : '/' , Component : HomePage }
    // Else we return null.
    return isRoute ? props : null;
  });

  // We concatenate the passed routes as children to the empty props array.
  const routesToUse = routes.concat(routeFromChildren).filter(Boolean);

  let routeParams = {};

  // In order to find which component is going to be rendered, we need to see which route matches.
  // We compare if the 'currentPath' (the path we are in browser) is equal to one of the paths
  // passed in the 'routes' array, if 'path' and 'currentPath' matches, we obtain the property
  // 'Component' from 'routes' array.
  const Page = routesToUse.find(({ path }) => {
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
