import React from 'react';
import {Button, StatusBar} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {ScreenName} from '../../../App';

const Start = () => {
	const navigation = useNavigation();
	return (
		<SafeAreaView>
			<StatusBar
				translucent={true}
				barStyle="dark-content"
				backgroundColor={'transparent'}
			/>
			<Button
				title={'Toevoegen'}
				onPress={() => navigation.navigate(ScreenName.Search)}
			/>
			<Button
				title={'Gerechten lijst'}
				onPress={() => navigation.navigate(ScreenName.Dishes)}
			/>
		</SafeAreaView>
	);
};

export default Start;
