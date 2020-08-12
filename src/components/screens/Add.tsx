import 'react-native-gesture-handler';
import React, {useCallback, useState} from 'react';
import {
	DynamicStyleSheet,
	DynamicValue,
	useDynamicValue,
} from 'react-native-dynamic';
import {ScrollView, Image, TextInput, View, Dimensions} from 'react-native';
import {RouteProp} from '@react-navigation/native';
import {RootStackParamList} from '../../../App';
import Colors from '../../styles/colors';
import Fonts from '../../styles/fonts';

type ShareScreenRouteProp = RouteProp<RootStackParamList, 'Add'>;

type Props = {
	route: ShareScreenRouteProp;
};

const Add = (props: Props) => {
	const styles = useDynamicValue(dynamicStyles);
	const {imageUrl, title} = props.route.params;
	const [value, onChangeText] = useState<string>(title);

	const onImageLoad = useCallback(() => {}, []);

	return (
		<ScrollView
			contentInsetAdjustmentBehavior="automatic"
			contentContainerStyle={styles.flex}>
			<Image
				style={styles.image}
				source={{uri: imageUrl}}
				onLoad={onImageLoad}
			/>
			<View style={[styles.bottomContainer, styles.grow]}>
				<View style={[styles.inputContainer]}>
					<TextInput
						style={styles.input}
						returnKeyType={'default'}
						onChangeText={(text) => onChangeText(text)}
						value={value}
					/>
				</View>
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
		elevation: 12,
	},
	bottomContainer: {
		marginTop: -20,
		borderTopStartRadius: 20,
		borderTopEndRadius: 20,
		backgroundColor: new DynamicValue(Colors.silver, Colors.chocolate),
	},
	input: {
		...Fonts.nobileBold,
		marginVertical: 10,
		marginHorizontal: 20,
		fontSize: 18,
		color: new DynamicValue(Colors.dark, Colors.white),
	},
	image: {
		width: '100%',
		height: Dimensions.get('screen').height / 2.25,
	},
});

export default Add;
