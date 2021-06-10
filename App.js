import { StatusBar } from 'expo-status-bar';
import React , { Component }  from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {connect,Provider} from "react-redux"
import Render from './Render'
import {store} from './Redux/store'
export default class App extends Component {
  render() {
    return (
         <Provider store={store}>
          <Render/>
         </Provider>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
