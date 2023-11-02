import { createNavigationContainerRef } from '@react-navigation/core';
import { CommonActions } from '@react-navigation/routers';

/**
 * Creates a ref that can be used to navigate to a new screen.
 * @returns {React.RefObject<NavigationContainerRef>} - A ref that can be used to navigate to a new screen.
 */
export const navigationRef = createNavigationContainerRef();

/**
 * Checks if the navigation is not ready, wait 50 milliseconds and try again, otherwise call the callback
 * function.
 * @param {() => void} moveCallback - This is the function that will be called when the navigation is
 * ready.
 * @returns None
 */
function navigationCheck(moveCallback: () => void): void {
  if (!navigationRef.isReady()) {
    setTimeout(() => navigationCheck(moveCallback), 50);
  } else {
    moveCallback?.();
  }
}

/**
 * Navigates back one screen in the navigation history.
 * @returns None
 */
export function navigateBack(): void {
  navigationCheck(() => {
    const backAction = CommonActions.goBack();
    navigationRef.dispatch(backAction);
  });
}

/**
 * Navigates to the given routeName with the given params.
 * @param {string} routeName - the name of the route to navigate to
 * @param {object} [params={}] - This is the object that contains the parameters that you want to pass to the next
 * screen
 * @param {boolean} [merge=false] - whether or not to merge the params with the existing params
 * @returns None
 */
export function navigateWithParam(routeName: string, params = {}, merge: boolean = false): void {
  navigationCheck(() => {
    const navigateAction = CommonActions.navigate({
      name: routeName,
      params,
      merge
    });
    navigationRef.dispatch(navigateAction);
  });
}
