import React, {useEffect, useState} from 'react';
import {Keyboard, StatusBar, StyleSheet, TextInput, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {FlatGrid} from 'react-native-super-grid';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';

const Search = () => {
	const navigation = useNavigation();
	const [items, setItems] = useState<any>([]);
	const [value, onChangeText] = useState<string>();

	useEffect(() => {
		const keyboardDidHideListener = Keyboard.addListener(
			'keyboardDidHide',
			() => {
				if (!value) {
					navigation.goBack();
				} else {
					setItems(mock);
				}
			},
		);
		return () => {
			keyboardDidHideListener.remove();
		};
	}, [navigation, value]);

	return (
		<SafeAreaView>
			<StatusBar
				translucent={true}
				barStyle="dark-content"
				backgroundColor={'transparent'}
			/>
			<TextInput
				autoFocus={true}
				returnKeyType={'search'}
				onChangeText={(text) => onChangeText(text)}
				value={value}
			/>
			<FlatGrid
				itemDimension={130}
				data={items}
				style={styles.gridView}
				spacing={10}
				renderItem={({item}) => (
					<TouchableWithoutFeedback
						onPress={() => navigation.navigate('Create')}>
						<View style={styles.itemContainer}>
							<FastImage
								style={styles.image}
								source={{uri: item.imageUrl}}
								resizeMode={FastImage.resizeMode.cover}
							/>
						</View>
					</TouchableWithoutFeedback>
				)}
			/>
		</SafeAreaView>
	);
};

export default Search;

const styles = StyleSheet.create({
	gridView: {
		marginTop: 10,
	},
	itemContainer: {
		borderRadius: 10,
		height: 150,
		overflow: 'hidden',
	},
	image: {
		width: '100%',
		height: '100%',
		resizeMode: 'cover',
	},
});

const mock = [
	{
		title: 'Tuna-meltwraps met spitskool en appel',
		imageUrl: 'https://static.ah.nl/static/recepten/img_120114_890x594_JPG.jpg',
		url:
			'https://ah.nl/allerhande/recept/R-R1189833/tuna-meltwraps-met-spitskool-en-appel',
	},
	{
		title: 'Tomatenrisotto met chorizo, spinazie en witte kaas',
		imageUrl: 'https://static.ah.nl/static/recepten/img_118107_890x594_JPG.jpg',
		url:
			'https://ah.nl/allerhande/recept/R-R1190108/tomatenrisotto-met-chorizo-spinazie-en-witte-kaas',
	},
	{
		title: 'Plaattaart met zoete aardappel, rode biet en feta',
		imageUrl: 'https://static.ah.nl/static/recepten/img_125743_890x594_JPG.jpg',
		url:
			'https://ah.nl/allerhande/recept/R-R1192268/plaattaart-met-zoete-aardappel-rode-biet-en-feta',
	},
	{
		title: 'Ravioli met tomaat, aubergine en burrata',
		imageUrl: 'https://static.ah.nl/static/recepten/img_110968_890x594_JPG.jpg',
		url:
			'https://ah.nl/allerhande/recept/R-R1190882/ravioli-met-tomaat-aubergine-en-burrata',
	},
	{
		title: 'Vegan rendang met spitskool en paddenstoelen',
		imageUrl: 'https://static.ah.nl/static/recepten/img_098503_890x594_JPG.jpg',
		url:
			'https://ah.nl/allerhande/recept/R-R1189429/vegan-rendang-met-spitskool-en-paddenstoelen',
	},
	{
		title: 'Beef rendang',
		imageUrl: 'https://static.ah.nl/static/recepten/img_097758_890x594_JPG.jpg',
		url: 'https://ah.nl/allerhande/recept/R-R1189428/beef-rendang',
	},
	{
		title: 'Pittige kipdrumsticks met tzatziki',
		imageUrl: 'https://static.ah.nl/static/recepten/img_106146_890x594_JPG.jpg',
		url:
			'https://ah.nl/allerhande/recept/R-R1190404/pittige-kipdrumsticks-met-tzatziki',
	},
	{
		title: 'Gnocchi ovenschotel met romige kip ',
		imageUrl:
			'https://static.ah.nl/static/recepten/img_RAM_PRD122160_890x594_JPG.jpg',
		url:
			'https://ah.nl/allerhande/recept/R-R1192683/gnocchi-ovenschotel-met-romige-kip',
	},
	{
		title: 'Kip in rendangsaus',
		imageUrl: 'https://static.ah.nl/static/recepten/img_097782_890x594_JPG.jpg',
		url: 'https://ah.nl/allerhande/recept/R-R1189427/kip-in-rendangsaus',
	},
	{
		title: 'Parelcouscous met tonijn, limoen & verse kruiden',
		imageUrl: 'https://static.ah.nl/static/recepten/img_111914_890x594_JPG.jpg',
		url:
			'https://ah.nl/allerhande/recept/R-R1190314/parelcouscous-met-tonijn-limoen-en-verse-kruiden',
	},
];
