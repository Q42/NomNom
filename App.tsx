import 'react-native-gesture-handler';
import React from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Share from './src/components/Share';
import Tinder from './src/components/Tinder';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <StatusBar barStyle="dark-content" />
      <Stack.Navigator>
        <Stack.Screen name="Share" component={Share} />
        <Stack.Screen name="Tinder" component={Tinder} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
