import {Tag} from '../models/tag';

class TagService {
	public static getTags = (): Tag[] => {
		return [
			{
				id: 0,
				title: 'Snel',
				icon: 'timer-outline',
			},
			{
				id: 1,
				title: 'Gezond',
				icon: 'nutrition-outline',
			},
			{
				id: 2,
				title: 'Koud',
				icon: 'snow-outline',
			},
			{
				id: 3,
				title: 'Ongezond',
				icon: 'fast-food-outline',
			},
		];
	};
}

export default TagService;
