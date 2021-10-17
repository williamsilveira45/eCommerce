import React from 'react';
import {Platform, SafeAreaView, StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import AppTabNavigation from './navigation/AppTabNavigation';
import colors from './assets/colors';
import NetInfo from '@react-native-community/netinfo';
//redux
import {Provider} from 'react-redux';
import {store} from './redux';
import {setConnectionStatus} from './redux/network';
import Login from './pages/Login';
import PDFViewer from "./pages/PDFViewer";

const Stack = createStackNavigator();

class App extends React.Component {
  constructor() {
    super();
    StatusBar.setBarStyle('dark-content');
    if (Platform.OS === 'android') {
      StatusBar.setBackgroundColor(colors.white);
    }

    this.networkInfo = NetInfo.addEventListener(state => {
      store.dispatch(setConnectionStatus(state.isConnected));
    });
  }

  componentWillUnmount() {
    this.networkInfo();
  }

  render() {
    return (
      <Provider store={store}>
        <SafeAreaView style={{flex: 1, backgroundColor: colors.white}}>
          <NavigationContainer initialRouteName="AppNavigation">
            <Stack.Navigator
              screenOptions={{
                headerShown: false,
              }}>
              <Stack.Screen
                name="Login"
                component={Login}
                options={{
                  cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
                }}
              />
              <Stack.Screen
                name="AppNavigation"
                component={AppTabNavigation}
                options={{
                  cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
                }}
              />
              <Stack.Screen
                name="PDFViewer"
                component={PDFViewer}
                options={{
                  cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
                }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </SafeAreaView>
      </Provider>
    );
  }
}

export default App;
