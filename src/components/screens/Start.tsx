import React from 'react';
import {Button, StatusBar} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';

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
				onPress={() => navigation.navigate('Search')}
			/>
		</SafeAreaView>
	);
};

export default Start;
