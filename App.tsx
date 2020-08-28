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
import Dishes from './src/components/screens/Dishes';
import Search from './src/components/screens/Search';
import AddDish from './src/components/screens/AddDish';
import ReceiveSharingIntent from 'react-native-receive-sharing-intent';
import urlRegex from 'url-regex';
import {ColorSchemeProvider} from 'react-native-dynamic';

export type RootStackParamList = {
	Share: {urls: string[]};
	AddDish: {imageUrl: string; title: string};
};

export enum ScreenName {
	Share = 'Share',
	Start = 'Start',
	Search = 'Search',
	Dishes = 'Dishes',
	AddDish = 'AddDish',
}

const MainStack = createStackNavigator();
const RootStack = createStackNavigator();

function MainStackScreen() {
	return (
		<MainStack.Navigator initialRouteName="Start" headerMode={'screen'}>
			<MainStack.Screen
				name={ScreenName.Start}
				component={Start}
				options={{headerShown: false}}
			/>
			<MainStack.Screen
				name={ScreenName.Search}
				component={Search}
				options={{
					title: '',
					headerTransparent: true,
					headerTintColor: '#ffffff',
					headerShown: true,
				}}
			/>
			<MainStack.Screen
				name={ScreenName.Dishes}
				component={Dishes}
				options={{title: 'Gerechten', headerShown: true}}
			/>
			<MainStack.Screen
				name={ScreenName.AddDish}
				component={AddDish}
				options={{headerShown: false}}
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
					<RootStack.Navigator
						mode="modal"
						screenOptions={{headerShown: false}}>
						<RootStack.Screen name="Main" component={MainStackScreen} />
						<RootStack.Screen
							name={ScreenName.Share}
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
