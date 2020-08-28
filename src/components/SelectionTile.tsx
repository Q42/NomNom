import React from 'react';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {
	GestureResponderEvent,
	StyleSheet,
	Text,
	View,
	ViewProps,
} from 'react-native';
import Colors from '../styles/colors';
import Fonts from '../styles/fonts';
import Icon from 'react-native-vector-icons/Ionicons';

interface SelectionTileProps extends ViewProps {
	title: string;
	icon: string;
	checked: Boolean;
	onPress?: (event: GestureResponderEvent) => void;
}

const SelectionTile = (props: SelectionTileProps) => {
	return (
		<View {...props} style={props.style}>
			<TouchableWithoutFeedback onPress={props.onPress}>
				<View
					style={[
						styles.itemContainer,
						props.checked ? styles.itemContainerSelected : null,
					]}>
					<Icon
						style={styles.icon}
						name={props.icon}
						size={38}
						color={props.checked ? Colors.white : Colors.secondary}
					/>
					<Text
						style={[
							styles.itemText,
							props.checked ? styles.itemTextSelected : null,
						]}>
						{props.title}
					</Text>
				</View>
			</TouchableWithoutFeedback>
		</View>
	);
};

export default SelectionTile;

const styles = StyleSheet.create({
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
});
