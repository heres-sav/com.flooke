/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect } from 'react';
import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  useColorScheme,
  NativeModules,
  TouchableOpacity,
  Text,
} from 'react-native';

import {Colors, Header} from 'react-native/Libraries/NewAppScreen';

const {BluetoothEscposPrinter, BluetoothManager} =
  NativeModules;

const App: () => Node = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  useEffect(() => {
    BluetoothManager.isBluetoothEnabled().then(enabled => {
      console.log(enabled);
    }, (err)=> {});
  }, [])

  const _scan = () => {
    console.log('Scanning');
    BluetoothManager.scanDevices().then(res => {
      console.log(res);
    }, (err)=> {
      alert('error' + JSON.stringify(err));
    });
  }

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Header />
        <TouchableOpacity onPress={() => _scan()}>
          <Text>Scan Devices</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default App;
