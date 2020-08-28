import React from 'react';
import {TouchableNativeFeedback} from 'react-native-gesture-handler';
import {StyleSheet, Text, View, ViewProps} from 'react-native';
import Colors from '../styles/colors';
import Fonts from '../styles/fonts';

interface ButtonProps extends ViewProps {
	text: String;
}

const Button = (props: ButtonProps) => {
	return (
		<View style={props.style}>
			<TouchableNativeFeedback>
				<View style={styles.container}>
					<Text style={styles.text}>{props.text}</Text>
				</View>
			</TouchableNativeFeedback>
		</View>
	);
};

export default Button;

const styles = StyleSheet.create({
	container: {
		backgroundColor: Colors.primary,
		borderRadius: 10,
		paddingVertical: 20,
		paddingHorizontal: 35,
		elevation: 4,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	text: {
		...Fonts.nobileRegular,
		fontSize: 18,
		color: Colors.white,
	},
});
