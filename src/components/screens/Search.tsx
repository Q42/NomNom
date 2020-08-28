import React, {useEffect, useState, useCallback} from 'react';
import {Keyboard, StatusBar, TextInput, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {FlatGrid} from 'react-native-super-grid';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import Fonts from '../../styles/fonts';
import {
	DynamicStyleSheet,
	DynamicValue,
	useDynamicValue,
} from 'react-native-dynamic';
import Colors from '../../styles/colors';

const Search = () => {
	const styles = useDynamicValue(dynamicStyles);
	const navigation = useNavigation();
	const insets = useSafeAreaInsets();
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

	const onSubmit = useCallback(() => {
		setItems(mock);
	}, []);

	return (
		<View style={styles.container}>
			<StatusBar
				translucent={true}
				barStyle="light-content"
				backgroundColor={'transparent'}
			/>
			<FlatGrid
				data={items}
				ListHeaderComponent={
					<>
						<TextInput
							style={[styles.input, {marginTop: insets.top}]}
							selectionColor={Colors.white}
							autoFocus={true}
							returnKeyType={'search'}
							onChangeText={(text) => onChangeText(text)}
							onSubmitEditing={() => onSubmit()}
							value={value}
						/>
					</>
				}
				ListHeaderComponentStyle={styles.header}
				contentContainerStyle={{paddingBottom: insets.bottom}}
				spacing={20}
				renderItem={({item}) => (
					<TouchableWithoutFeedback
						onPress={() =>
							navigation.navigate('Add', {
								title: value,
								imageUrl: item.imageUrl,
							})
						}>
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
		</View>
	);
};

export default Search;

const dynamicStyles = new DynamicStyleSheet({
	gridView: {
		marginTop: 20,
	},
	header: {
		marginBottom: 30,
	},
	gridContainer: {
		borderTopStartRadius: 20,
		borderTopEndRadius: 20,
		backgroundColor: new DynamicValue(Colors.white, Colors.dark),
	},
	container: {
		flex: 1,
		flexGrow: 1,
		backgroundColor: Colors.primary,
	},
	input: {
		...Fonts.openSansRegular,
		marginVertical: 10,
		marginHorizontal: 20,
		fontSize: 18,
		color: Colors.white,
		borderBottomColor: Colors.white,
		borderBottomWidth: 2,
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
