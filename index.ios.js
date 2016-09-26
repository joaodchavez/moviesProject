/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  NavigatorIOS, 
  View
} from 'react-native';

const Main = require("./App/Components/Main");

class moviesApp extends Component {
  render() {
    return (
      <View>
        <NavigatorIOS
          style={styles.container}
          initialRoute={{
            title: 'Movies App',
            component: Main,
          }}/>
       </View> 
    );
  }
}

var styles = StyleSheet.create({
  container: {
        flex: 1,
        height: 687
  },
});

AppRegistry.registerComponent('moviesApp', () => moviesApp);


