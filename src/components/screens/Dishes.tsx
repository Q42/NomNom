import React, {useEffect, useState} from 'react';
import {StatusBar, View, Text, StyleSheet} from 'react-native';
import {FlatList, TouchableNativeFeedback} from 'react-native-gesture-handler';
import DishService from '../../services/dishService';
import {Dish} from '../../models/dish';
import {SafeAreaView} from 'react-native-safe-area-context';
import FastImage from 'react-native-fast-image';
import Colors from '../../styles/colors';
import Typography from '../../styles/typography';

const Dishes = () => {
	const [dishes, setDishes] = useState<Dish[]>([]);

	useEffect(() => {
		async function populateDishesState() {
			setDishes(await DishService.getDishes());
		}
		// noinspection JSIgnoredPromiseFromCall
		populateDishesState();
	}, []);

	return (
		<SafeAreaView edges={['bottom', 'left', 'right']}>
			<StatusBar
				translucent={true}
				barStyle="dark-content"
				backgroundColor={'transparent'}
			/>
			<FlatList
				data={dishes}
				keyExtractor={(item) => item.imageUrl}
				renderItem={({item}) => (
					<TouchableNativeFeedback>
						<View style={styles.itemContainer}>
							<FastImage
								style={styles.image}
								source={{uri: item.imageUrl}}
								resizeMode={FastImage.resizeMode.cover}
							/>
							<Text style={styles.text}>{item.title}</Text>
						</View>
					</TouchableNativeFeedback>
				)}
			/>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	itemContainer: {
		backgroundColor: Colors.primary,
	},
	text: {
		...Typography.header4,
		padding: 20,
		color: Colors.white,
	},
	image: {
		width: '100%',
		height: 200,
		borderTopRightRadius: 20,
		borderTopEndRadius: 20,
	},
});

export default Dishes;
