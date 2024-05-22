import { EVENTS } from './events';

// Function to obtain the current browser URL.
export function getCurrentPath() {
  return window.location.pathname;
}

// What we are doing here to optimize loading, or create a SPA, we are using the web history
// to get or return pages that already been loaded, that way the page getS loaded once.

// The Best from to perform a SPA, is by creating a function called 'navigate' that takes 'href' as a
// parameter.
export function navigate(href) {
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
