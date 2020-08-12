import 'react-native-gesture-handler';
import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, ScrollView, Image} from 'react-native';
import {RouteProp} from '@react-navigation/native';
import {RootStackParamList} from '../../../App';
import {useMount} from '../../utils/HooksUtils';

const baseUrl =
	'https://europe-west3-tell-me-what-to-eat-94d90.cloudfunctions.net/getMetadata';

type ShareScreenRouteProp = RouteProp<RootStackParamList, 'Share'>;

type Props = {
	route: ShareScreenRouteProp;
};

const Share = (props: Props) => {
	const [image, setImage] = useState<string>();
	const {urls} = props.route.params;

	useMount(() => {
		fetch(`${baseUrl}?url=${urls[0]}`).then((response) => {
			response.json().then((body: any) => {
				console.warn(body.image);
				setImage(body.image);
			});
		});
	});

	return (
		<SafeAreaView>
			<ScrollView contentInsetAdjustmentBehavior="automatic">
				<Image style={styles.image} source={{uri: image}} />
			</ScrollView>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	flex: {},
	image: {
		width: 200,
		height: 200,
	},
});

export default Share;
