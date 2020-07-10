import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  StatusBar,
  Text,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import ReceiveSharingIntent from 'react-native-receive-sharing-intent';

const App = () => {
  const [url, setUrl] = useState<string | null | undefined>();
  useEffect(() => {
    ReceiveSharingIntent.getReceivedFiles(
      (files: any) => {
        files.forEach((file: any) => {
          const {text} = file;
          setUrl(text);
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
          <Text>{url}</Text>
        </ScrollView>
      </SafeAreaView>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  scrollView: {},
});

export default App;
