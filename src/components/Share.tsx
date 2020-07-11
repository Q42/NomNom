import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Image,
  Button,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
// @ts-ignore
import ReceiveSharingIntent from 'react-native-receive-sharing-intent';
import urlRegex from 'url-regex';

const Share = () => {
  const [image, setImage] = useState<string>();
  const navigation = useNavigation();

  useEffect(() => {
    ReceiveSharingIntent.getReceivedFiles(
      (files: any) => {
        files.forEach((file: any) => {
          const {text} = file;
          const urls = text.match(urlRegex());
          // const metadata = urlMetadata(urls[0]);
          // metadata.then((data) => {
          fetch(
            `https://us-central1-tell-me-what-to-eat-94d90.cloudfunctions.net/getMetadata?url=${urls[0]}`,
          ).then((response) => {
            response.json().then((body: any) => {
              console.warn(body.image);
              setImage(body.image);
            });
          });
          // });
        });
      },
      (error: any) => {
        console.log(error);
      },
    );
  }, []);

  return (
    <SafeAreaView>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.scrollView}>
        <Image style={styles.image} source={{uri: image}} />
        <Button
          title="Go to Tinder"
          onPress={() => navigation.navigate('Tinder')}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  scrollView: {},
  image: {
    width: 200,
    height: 200,
  },
});

export default Share;
