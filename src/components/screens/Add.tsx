import 'react-native-gesture-handler';
import React, {useCallback, useState} from 'react';
import {
	DynamicStyleSheet,
	DynamicValue,
	useDynamicValue,
} from 'react-native-dynamic';
import {Image, TextInput, View, Dimensions, Text} from 'react-native';
import {RouteProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../../../App';
import Colors from '../../styles/colors';
import Fonts from '../../styles/fonts';
import Button from '../Button';
import {FlatGrid} from 'react-native-super-grid';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import {SafeAreaView} from 'react-native-safe-area-context';
import TagService from '../../services/tagService';
import DishService from '../../services/dishService';
import {StackNavigationProp} from '@react-navigation/stack';

type Props = {
	route: ShareScreenRouteProp;
};

const Add = (props: Props) => {
	const styles = useDynamicValue(dynamicStyles);

	const navigation = useNavigation<ShareScreenStackNavigationProp>();
	const {imageUrl, title} = props.route.params;

	const [value, onChangeText] = useState<string>(title);
	const [tags, onChangeTagSelection] = useState(
		TagService.getTags().map((tag) => ({...tag, checked: false})),
	);

	const onSubmit = useCallback(async () => {
		await DishService.addDish({
			title: value,
			imageUrl: imageUrl,
			tagIds: tags.map((tag) => tag.id),
		});
		navigation.popToTop();
	}, [navigation, value, imageUrl, tags]);

	return (
		<>
			<Image style={styles.image} source={{uri: imageUrl}} />
			<View style={[styles.bottomContainer, styles.grow]}>
				<View style={[styles.inputContainer]}>
					<TextInput
						style={styles.input}
						returnKeyType={'default'}
						onChangeText={(text) => onChangeText(text)}
						value={value}
					/>
				</View>
				<View style={[styles.grow, styles.tagContainer]}>
					<FlatGrid
						spacing={20}
						data={tags}
						scrollEnabled={false}
						renderItem={({item}) => (
							<TouchableWithoutFeedback
								key={item.title}
								onPress={() => {
									const t = [...tags];
									const index = t.findIndex((i) => i.title === item.title);
									t[index].checked = !item.checked;
									onChangeTagSelection(t);
								}}>
								<View
									style={[
										styles.itemContainer,
										item.checked ? styles.itemContainerSelected : null,
									]}>
									<Icon
										style={styles.icon}
										name={item.icon}
										size={38}
										color={item.checked ? Colors.white : Colors.secondary}
									/>
									<Text
										style={[
											styles.itemText,
											item.checked ? styles.itemTextSelected : null,
										]}>
										{item.title}
									</Text>
								</View>
							</TouchableWithoutFeedback>
						)}
					/>
				</View>
				<SafeAreaView>
					<Button style={styles.button} text={'Toevoegen'} onPress={onSubmit} />
				</SafeAreaView>
			</View>
		</>
	);
};

const dynamicStyles = new DynamicStyleSheet({
	grow: {
		flexGrow: 1,
	},
	inputContainer: {
		marginTop: -35,
		backgroundColor: new DynamicValue(Colors.white, Colors.dark),
		borderRadius: 20,
		marginHorizontal: 25,
		justifyContent: 'space-between',
		shadowColor: '#444',
		shadowOffset: {
			width: 0,
			height: 6,
		},
		shadowOpacity: 0.37,
		shadowRadius: 7.49,
		elevation: 12,
	},
	itemContainer: {
		borderRadius: 10,
		borderColor: Colors.secondary,
		borderWidth: 2,
		paddingHorizontal: 5,
		paddingVertical: 10,
	},
	itemContainerSelected: {
		backgroundColor: Colors.secondary,
	},
	itemText: {
		...Fonts.openSansRegular,
		fontSize: 16,
		textAlign: 'center',
		color: Colors.secondary,
	},
	icon: {
		paddingBottom: 5,
		alignSelf: 'center',
	},
	itemTextSelected: {
		color: Colors.white,
	},
	bottomContainer: {
		marginTop: -20,
		borderTopStartRadius: 20,
		borderTopEndRadius: 20,
		backgroundColor: new DynamicValue(Colors.silver, Colors.chocolate),
		flexDirection: 'column',
	},
	tagContainer: {
		padding: 10,
	},
	input: {
		...Fonts.openSansRegular,
		marginVertical: 10,
		marginHorizontal: 20,
		padding: 10,
		fontSize: 18,
		color: new DynamicValue(Colors.chocolate, Colors.white),
	},
	image: {
		width: '100%',
		height: Dimensions.get('screen').height / 2.25,
	},
	button: {
		margin: 20,
	},
});

type ShareScreenRouteProp = RouteProp<RootStackParamList, 'Add'>;
type ShareScreenStackNavigationProp = StackNavigationProp<
	RootStackParamList,
	'Add'
>;

export default Add;
