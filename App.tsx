import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  StatusBar,
  Text,
  Image,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import ReceiveSharingIntent from 'react-native-receive-sharing-intent';
import urlRegex from 'url-regex';
// import urlMetadata from 'url-metadata';

const App = () => {
  const [image, setImage] = useState<string>();
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
    <NavigationContainer>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <Image style={styles.image} source={{uri: image}} />
        </ScrollView>
      </SafeAreaView>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  scrollView: {},
  image: {
    width: 200,
    height: 200,
  },
});

export default App;
