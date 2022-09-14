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
  useColorScheme,
  TouchableOpacity,
  Text,
  NativeModules
} from 'react-native';
import {Colors, Header} from 'react-native/Libraries/NewAppScreen';

console.log(NativeModules);
const {
  BluetoothEscposPrinter,
  BluetoothManager
} = NativeModules

const App: () => Node = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  useEffect(() => {
    BluetoothManager
    .isBluetoothEnabled()
    .then((enabled)=> {
      console.log(enabled);
    }, (err)=> {
      err
    })
  }, [])
  return (
    <SafeAreaView style={backgroundStyle}>
      <Header />
      <TouchableOpacity onPress={() => {
        console.log(BluetoothManager);
        alert('error' + JSON.stringify(BluetoothManager));
        BluetoothManager
        .scanDevices()
        .then((s)=> {
          alert('result')
        }, (er)=> {
          alert('error' + JSON.stringify(er));
        });
      }}>
        <Text>Scan Devices</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default App;
