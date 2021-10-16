import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Cart from '../pages/Cart';
import Checkout from '../pages/Cart/checkout';

const Stack = createStackNavigator();

function CartNavigation() {
  return (
    <Stack.Navigator
      initialRouteName="Cart"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Cart" component={Cart} />
      <Stack.Screen name="Checkout" component={Checkout} />
    </Stack.Navigator>
  );
}

export default CartNavigation;
