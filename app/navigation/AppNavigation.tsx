import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { ROUTES } from '../constants';
import { HomeScreen } from '../modules';
import { navigationRef } from '../utils';

/**
 * The type of the navigation prop for the RootStack.
 * @typedef {object} RootStackParamList is an object type with keys that are the route names
 * and values that are the route params
 * @property {undefined} [Home] - The Home screen.
 * @property {undefined} [Details] - The Details screen.
 * @property {undefined} [SignIn] - The SignIn screen.
 */
// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
type RootStackParamList = {
  // add types for route params here e.g. -
  // [ROUTES.Profile]: { id: string };
  [ROUTES.Home]: undefined;
};

/**
 * Creating a stack navigator with the type of RootStackParamList.
 * @returns {StackNavigator} - The root stack navigator.
 */
const RootStack = createNativeStackNavigator<RootStackParamList>();

/**
 * The main App container.
 * @returns {React.ReactNode} The main App container.
 */
const AppContainer = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <RootStack.Navigator>
        <RootStack.Screen name={ROUTES.Home} component={HomeScreen} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default AppContainer;
