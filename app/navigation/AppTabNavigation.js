import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import {CardStyleInterpolators} from '@react-navigation/stack';
import colors from '../assets/colors';
import Settings from './SettingsNavigation';
import DeviceInfo from 'react-native-device-info';
import HomeNavigation from './HomeNavigation';
import {TAB_HEIGHT, TAB_HEIGHT_DEVICE_NOTCH} from '../assets/functions';
import CartNavigation from './CartNavigation';
import {Badge} from 'react-native-elements';

const Tab = createBottomTabNavigator();
const deviceNotch = DeviceInfo.hasNotch();

export default class AppTabNavigation extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <Tab.Navigator
        initialRouteName="HomeNavigation"
        tabBarOptions={{
          labelStyle: {
            fontSize: 14,
          },
          style: {
            height: deviceNotch ? TAB_HEIGHT_DEVICE_NOTCH : TAB_HEIGHT,
            paddingTop: deviceNotch ? '2%' : '1%',
            paddingBottom: '2%',
          },
          activeTintColor: colors.primaryColor,
        }}>
        <Tab.Screen
          name="HomeNavigation"
          component={HomeNavigation}
          options={{
            cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
            tabBarLabel: 'Produtos',
            tabBarIcon: ({color, size}) => (
              <FontAwesome name="home" size={28} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Cart"
          component={CartNavigation}
          options={{
            tabBarLabel: 'Carrinho',
            tabBarIcon: ({color, size}) => (
              <>
                <Feather name="shopping-cart" size={28} color={color} />
                <Badge status="primary" value={1} containerStyle={{ position: 'absolute', top: -1, right: 40 }} />
              </>
            ),
          }}
        />
        <Tab.Screen
          name="Settings"
          component={Settings}
          options={{
            tabBarLabel: 'Configurações',
            tabBarIcon: ({color, size}) => (
              <FontAwesome name="gear" size={28} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    );
  }
}
