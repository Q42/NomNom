import {StyleSheet} from 'react-native';
import Fonts from './fonts';
import Colors from './colors';

const Typography = StyleSheet.create({
	header1: {
		...Fonts.quickSandBold,
		fontSize: 32,
		color: Colors.dark,
	},
	header2: {
		...Fonts.nobileBold,
		fontSize: 26,
		color: Colors.dark,
	},
	header3: {
		...Fonts.quickSandBold,
		fontSize: 20,
		color: Colors.dark,
	},
	header4: {
		...Fonts.quickSandBold,
		fontSize: 16,
		color: Colors.dark,
	},
	header5: {
		...Fonts.quickSandRegular,
		fontSize: 16,
		color: Colors.dark,
	},
	header6: {
		...Fonts.nobileRegular,
		fontSize: 14,
		color: Colors.dark,
	},
	inverse: {
		color: Colors.white,
	},
	body: {
		...Fonts.openSansRegular,
		fontSize: 14,
		color: Colors.dark,
	},
});

export default Typography;
