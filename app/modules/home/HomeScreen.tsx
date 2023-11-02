import React, { type FC } from 'react';
import { View, Text } from 'react-native';
import { Strings } from '../../constants';

/**
 *
 * @returns HomeScreen.
 */
const HomeScreen: FC = () => {
  return (
    <View>
      <Text>{Strings.homeScreen}</Text>
    </View>
  );
};

export default HomeScreen;
