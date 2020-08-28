import firestore from '@react-native-firebase/firestore';
import {Recipe} from '../models/recipe';

class RecipeService {
	public static async getRecipesFor(searchString: string): Promise<Recipe[]> {
		const BLOCK_LIST = ['&', 'met', 'en', 'in', 'van'];
		const searchKeywords = searchString
			.split(' ')
			.map((x) => x.replace(',', '').toLowerCase())
			.filter((x) => x && !BLOCK_LIST.includes(x));
		const value = await firestore()
			.collection('recipes')
			.where('keywords', 'array-contains-any', searchKeywords)
			.limit(20)
			.get();
		return value.docs.map((querySnapshot) => querySnapshot.data()) as Recipe[];
	}
}

export default RecipeService;
