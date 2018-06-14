/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    TabBarIOS,
    Text,
    ScrollView,
    AppRegistry,
} from 'react-native';
import { createStackNavigator } from 'react-navigation';

import HomePage from './src/screens/HomePage';
import SecondPage from './src/screens/SecondPage';
import ThirdPage from './src/screens/ThirdPage';

type Props = {};



const ScreensHeader = createStackNavigator(
  {
    Home: HomePage,
    Second: SecondPage,
    Third:ThirdPage,
  },
  {
    initialRouteName: 'Home',
  }
);


export default class App extends Component<Props> {

  constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            selectIndex:0
        };
  }

  render() {
    return (
    
      < View style = { styles.container } >
             < TabBarIOS style = { styles.tabbar } >
              < TabBarIOS.Item systemIcon = "bookmarks"
                onPress = {() => { this.setState({ selectIndex: 0 }) } }
                selected = { this.state.selectIndex == "0" } >
                <HomePage>
                </HomePage>
              < /TabBarIOS.Item>

              < TabBarIOS.Item systemIcon = "search"
                onPress = {() => { this.setState({ selectIndex: 1 }) } }
                selected = { this.state.selectIndex == "1" } >

                <SecondPage>
                </SecondPage>
              < /TabBarIOS.Item>
            < /TabBarIOS>  
          < /View>
    );
  }
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#EFEFEF',
    },
    tabbar: {
        alignSelf: "stretch"
    },
    pageStyle:{
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'space-between',
    }
});
