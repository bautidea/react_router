import { EVENTS } from '../events';

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
  const navigationEvent = new Event(EVENTS.NAVIGATION_EVENT); // Creating the event.

  // Now i have to sent the event.
  window.dispatchEvent(navigationEvent); // Dispatching event so a listener can grab it.
}

export function Link({ target, destination, ...props }) {
  // In '...props' we are going to pass other attributes like, 'className' for example.
  // Also the props 'children' get passed through here, like 'children = {children}'

  const handleClick = (event) => {
    // Natively the keyboard functions on a <a> element doesnt work, so we have to make them work manually.
    // Checking if the user used the primary click (in my case is the left click of mouse).
    const isMainEvent = event.button === 0;

    // Checking if event is modified, this means if when clicking the element the user is clicking any of the
    // described keys (ctrl, alt, shift, etc), this will produce different results based on the stroked key.
    const isModifiedEvent =
      event.metaKey || event.altKey || event.ctrlKey || event.shiftKey;

    // Checking 'target' property from <a> element, if '_blank' then it means that the page (or linked document)
    // opens on a new tab, if '_self' opens the page in the same frame (default), etc.
    // This const is called 'manageable' and is checking for '_self' of 'undefined' because if it is '_blank', the page will be
    // loaded in other tab (navigate function should not be used on new tabs, because all elements will be loaded again).
    const isManageableEvent = target === undefined || target === '_self';

    if (isMainEvent && isManageableEvent && !isModifiedEvent) {
      // Preventing default state in which a page will re-load when clicking on <a> element.
      event.preventDefault();
      navigate(destination);
    }
  };

  return (
    <a onClick={handleClick} href={destination} target={target} {...props}></a>
  );
}
