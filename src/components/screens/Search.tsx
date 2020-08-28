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
import RecipeService from '../../services/recipeService';

const Search = () => {
	const styles = useDynamicValue(dynamicStyles);
	const navigation = useNavigation();
	const insets = useSafeAreaInsets();
	const [items, setItems] = useState<any>([]);
	const [value, onChangeText] = useState<string>();

	const onSubmit = useCallback(async () => {
		if (!value) {
			return;
		}
		try {
			const results = await RecipeService.getRecipesFor(value);
			setItems(results);
		} catch (e) {
			console.error(e);
		}
	}, [value]);

	useEffect(() => {
		const keyboardDidHideListener = Keyboard.addListener(
			'keyboardDidHide',
			async () => {
				if (!value) {
					navigation.goBack();
				} else {
					await onSubmit();
				}
			},
		);
		return () => {
			keyboardDidHideListener.remove();
		};
	}, [onSubmit, navigation, value]);

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
							autoCorrect={false}
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
