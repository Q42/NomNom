import 'react-native-gesture-handler';
import React, {useEffect, useRef} from 'react';
import {StatusBar} from 'react-native';
import {
  NavigationContainer,
  NavigationContainerRef,
} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Share from './src/components/Share';
import Tinder from './src/components/Tinder';
import ReceiveSharingIntent from 'react-native-receive-sharing-intent';
import urlRegex from 'url-regex';

export type RootStackParamList = {
  Share: {urls: string[]};
};

const MainStack = createStackNavigator();
const RootStack = createStackNavigator();

function MainStackScreen() {
  return (
    <MainStack.Navigator>
      <MainStack.Screen name="Tinder" component={Tinder} />
    </MainStack.Navigator>
  );
}

const App = () => {
  const navigation = useRef<NavigationContainerRef>(null);
  useEffect(() => {
    ReceiveSharingIntent.getReceivedFiles(
      (files) => {
        files.forEach((file: any) => {
          const {text} = file;
          const urls = text.match(urlRegex());
          navigation.current?.navigate('Share', {urls});
        });
      },
      (error: any) => {
        console.log(error);
      },
    );
  }, []);
  return (
    <NavigationContainer ref={navigation}>
      <StatusBar barStyle="dark-content" />
      <RootStack.Navigator mode="modal">
        <RootStack.Screen
          name="Main"
          component={MainStackScreen}
          options={{headerShown: false}}
        />
        <RootStack.Screen
          name="Share"
          component={Share}
          options={{title: '', headerTransparent: true}}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default App;
