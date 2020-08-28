import AsyncStorage from '@react-native-community/async-storage';
import {Dish} from '../models/dish';

const dishesStorageKey = '@dishes';

class DishService {
	public static getDishes = async (): Promise<Dish[]> => {
		try {
			const value = await AsyncStorage.getItem(dishesStorageKey);
			if (value === null) {
				return [];
			}
			return JSON.parse(value);
		} catch (e) {
			return [];
		}
	};
	public static addDish = async (dish: Dish): Promise<void> => {
		try {
			const dishes = await DishService.getDishes();
			dishes.push(dish);
			await AsyncStorage.setItem(dishesStorageKey, JSON.stringify(dishes));
		} catch (e) {}
	};
}

export default DishService;
