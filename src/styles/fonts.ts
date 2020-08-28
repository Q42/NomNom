import {StyleSheet, TextStyle} from 'react-native';
import {Device} from '../utils/Device';

type FontStyle =
	| 'nobileBold'
	| 'nobileRegular'
	| 'openSansRegular'
	| 'quickSandBold'
	| 'quickSandLight'
	| 'quickSandRegular';

const fonts: Record<FontStyle, TextStyle> = {
	nobileBold: {
		fontFamily: 'Nobile-Bold',
		fontWeight: '700',
		fontStyle: 'normal',
		includeFontPadding: false,
	},
	nobileRegular: {
		fontFamily: 'Nobile-Regular',
		fontWeight: '400',
		fontStyle: 'normal',
		includeFontPadding: false,
	},
	openSansRegular: {
		fontFamily: 'Open Sans',
		fontWeight: '400',
		fontStyle: 'normal',
		includeFontPadding: false,
	},
	quickSandBold: {
		fontFamily: 'Quicksand-Bold',
		fontWeight: '700',
		fontStyle: 'normal',
		includeFontPadding: false,
	},
	quickSandLight: {
		fontFamily: 'Quicksand-Light',
		fontWeight: '100',
		fontStyle: 'normal',
		includeFontPadding: false,
	},
	quickSandRegular: {
		fontFamily: 'Quicksand-Regular',
		fontWeight: '400',
		fontStyle: 'normal',
		includeFontPadding: false,
	},
};

if (Device.isAndroid) {
	fonts.nobileBold.fontFamily = 'Nobile Bold';
	fonts.nobileRegular.fontFamily = 'Nobile';
	fonts.openSansRegular.fontFamily = 'Open Sans';
	fonts.quickSandBold.fontFamily = 'Quicksand-Bold';
	fonts.quickSandLight.fontFamily = 'Quicksand-Light';
	fonts.quickSandRegular.fontFamily = 'Quicksand-Regular';
}

export default StyleSheet.create(fonts);
