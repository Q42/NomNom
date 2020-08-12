import {Platform} from 'react-native';

export class Device {
	public static get isIOS(): boolean {
		return Platform.OS === 'ios';
	}
	public static get isAndroid(): boolean {
		return Platform.OS === 'android';
	}
}
