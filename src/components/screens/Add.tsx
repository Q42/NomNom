import 'react-native-gesture-handler';
import React, {useState} from 'react';
import {
	DynamicStyleSheet,
	DynamicValue,
	useDynamicValue,
} from 'react-native-dynamic';
import {
	ScrollView,
	Image,
	TextInput,
	View,
	Dimensions,
	Text,
} from 'react-native';
import {RouteProp} from '@react-navigation/native';
import {RootStackParamList} from '../../../App';
import Colors from '../../styles/colors';
import Fonts from '../../styles/fonts';
import Button from '../Button';
import {FlatGrid} from 'react-native-super-grid';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';

type ShareScreenRouteProp = RouteProp<RootStackParamList, 'Add'>;

type Props = {
	route: ShareScreenRouteProp;
};

enum TagType {
	Fast,
	Unhealthy,
	Healthy,
	Cold,
}

const Add = (props: Props) => {
	const styles = useDynamicValue(dynamicStyles);
	const {imageUrl, title} = props.route.params;
	const [value, onChangeText] = useState<string>(title);
	const [tags, onChangeTagSelection] = useState([
		{
			type: TagType.Fast,
			name: 'Snel',
			icon: 'timer-outline',
			checked: false,
		},
		{
			type: TagType.Healthy,
			name: 'Gezond',
			icon: 'nutrition-outline',
			checked: false,
		},
		{
			type: TagType.Cold,
			name: 'Koud',
			icon: 'snow-outline',
			checked: false,
		},
		{
			type: TagType.Unhealthy,
			name: 'Ongezond',
			icon: 'fast-food-outline',
			checked: false,
		},
	]);

	return (
		<ScrollView contentContainerStyle={styles.flex}>
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
				<View style={styles.grow}>
					<FlatGrid
						spacing={20}
						data={tags}
						scrollEnabled={false}
						renderItem={({item}) => (
							<TouchableWithoutFeedback
								key={item.type}
								onPress={() => {
									const t = [...tags];
									const index = t.findIndex((i) => i.type === item.type);
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
										{item.name}
									</Text>
								</View>
							</TouchableWithoutFeedback>
						)}
					/>
				</View>
				<Button style={styles.button} text={'Toevoegen'} />
			</View>
		</ScrollView>
	);
};

const dynamicStyles = new DynamicStyleSheet({
	flex: {
		flex: 1,
	},
	grow: {
		flexGrow: 1,
	},
	inputContainer: {
		marginTop: -35,
		backgroundColor: new DynamicValue(Colors.white, Colors.dark),
		borderRadius: 20,
		marginHorizontal: 25,
		justifyContent: 'space-between',
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
		...Fonts.nobileRegular,
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
	input: {
		...Fonts.nobileBold,
		marginVertical: 10,
		marginHorizontal: 20,
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

export default Add;
