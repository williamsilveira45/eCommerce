import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Settings from '../pages/Settings';

const Stack = createStackNavigator();

function SettingsNavigation() {
  return (
    <Stack.Navigator
      initialRouteName="Settings"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Settings" component={Settings} />
    </Stack.Navigator>
  );
}

export default SettingsNavigation;
