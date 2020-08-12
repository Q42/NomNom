import 'react-native-gesture-handler';
import React, {useEffect, useRef} from 'react';
import {
	NavigationContainer,
	NavigationContainerRef,
} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import Share from './src/components/screens/Share';
import Start from './src/components/screens/Start';
import Search from './src/components/screens/Search';
import Add from './src/components/screens/Add';
import ReceiveSharingIntent from 'react-native-receive-sharing-intent';
import urlRegex from 'url-regex';
import {ColorSchemeProvider} from 'react-native-dynamic';

export type RootStackParamList = {
	Share: {urls: string[]};
	Add: {imageUrl: string; title: string};
};

const MainStack = createStackNavigator();
const RootStack = createStackNavigator();

function MainStackScreen() {
	return (
		<MainStack.Navigator initialRouteName="Start" headerMode="none">
			<MainStack.Screen
				name="Start"
				component={Start}
				options={{title: '', headerTransparent: true}}
			/>
			<MainStack.Screen
				name="Search"
				component={Search}
				options={{title: '', headerTransparent: true}}
			/>
			<MainStack.Screen
				name="Add"
				component={Add}
				options={{title: '', headerTransparent: true}}
			/>
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
			<SafeAreaProvider>
				<ColorSchemeProvider>
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
				</ColorSchemeProvider>
			</SafeAreaProvider>
		</NavigationContainer>
	);
};

export default App;
