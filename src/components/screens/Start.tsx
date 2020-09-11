import React from 'react';
import {Button, StatusBar, StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import Card from '../Card';

const mock = {
	id: '1189833',
	title: 'Tuna meltwraps',
	imageUrl: 'https://static.ah.nl/static/recepten/img_120114_890x594_JPG.jpg',
	url:
		'https://ah.nl/allerhande/recept/R-R1189833/tuna-meltwraps-met-spitskool-en-appel',
	tags: ['ongezond', 'snel'],
};

const Start = () => {
	const navigation = useNavigation();
	return (
		<SafeAreaView style={styles.container}>
			<StatusBar
				translucent={true}
				barStyle="dark-content"
				backgroundColor={'transparent'}
			/>
			<View style={styles.cardContainer}>
				<Card name={mock.title} imageUrl={mock.imageUrl} tags={mock.tags} />
			</View>
			<Button
				title={'Toevoegen'}
				onPress={() => navigation.navigate('Search')}
			/>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexGrow: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	cardContainer: {
		width: '100%',
		padding: 40,
		flex: 1,
	},
});

export default Start;
