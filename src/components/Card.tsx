import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import FastImage from 'react-native-fast-image';
import Fonts from '../styles/fonts';
import Colors from '../styles/colors';
import {TouchableNativeFeedback} from 'react-native-gesture-handler';

export interface ICard {
	name: string;
	imageUrl: string;
	tags?: string[];
}

const Card = (card: ICard) => {
	const onClick = () => {};

	return (
		<View style={styles.card}>
			<FastImage style={styles.cardImage} source={{uri: card.imageUrl}} />
			<View style={styles.cardBody}>
				<View>
					<Text style={styles.cardText}>{card.name}</Text>
					{card.tags && (
						<View style={styles.cardTags}>
							{card.tags.map((tag, index) => (
								<Text style={styles.cardTag} key={index}>
									{tag}
								</Text>
							))}
						</View>
					)}
				</View>
				<View style={styles.buttonContainer}>
					<TouchableNativeFeedback onPress={onClick}>
						<View style={styles.button}>
							<Text style={styles.buttonText}>Geen zin in</Text>
						</View>
					</TouchableNativeFeedback>
				</View>
			</View>
		</View>
	);
};

const CARD_BORDER_RADIUS = 20;

const styles = StyleSheet.create({
	card: {
		flex: 0.6,
		borderRadius: CARD_BORDER_RADIUS,
		shadowRadius: 25,
		shadowColor: '#000',
		shadowOpacity: 0.1,
		shadowOffset: {width: 0, height: 0},
		backgroundColor: '#fff',
	},
	cardImage: {
		flex: 1,
		borderTopLeftRadius: CARD_BORDER_RADIUS,
		borderTopRightRadius: CARD_BORDER_RADIUS,
		width: '100%',
		resizeMode: 'cover',
	},
	cardBody: {
		flex: 0.5,
		padding: 20,
		justifyContent: 'space-between',
	},
	cardText: {
		...Fonts.quickSandBold,
		fontSize: 18,
	},
	cardTags: {
		marginTop: 5,
		flexDirection: 'row',
		flexWrap: 'wrap',
	},
	cardTag: {
		...Fonts.quickSandRegular,
		fontSize: 14,
		color: Colors.secondary,
		textTransform: 'uppercase',
		marginRight: 10,
	},
	buttonContainer: {
		alignSelf: 'flex-start',
	},
	button: {
		borderWidth: 1,
		borderColor: Colors.primary,
		borderRadius: 5,
		paddingHorizontal: 10,
		paddingVertical: 12,
	},
	buttonText: {
		...Fonts.quickSandRegular,
		color: Colors.primary,
	},
});

export default Card;
