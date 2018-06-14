import React, { Component } from 'react';
import {
  ListView,
  View,
  StyleSheet,
  TouchableOpacity,
  YellowBox
} from 'react-native';

import {
  RkStyleSheet,
  RkText,
  RkTextInput,
  RkTheme
} from 'react-native-ui-kitten';

import { 
  Container
} from 'native-base';

import { 
  Header,
  SearchBar 
} from 'react-native-elements';

import {FontAwesome} from '../assets/icons';

import ThirdPage from './ThirdPage';

import { createStackNavigator } from 'react-navigation';

import Icon from 'react-native-vector-icons/FontAwesome';

const datas = [
  {key: 'Simon Mignolet'},
  {key: 'Nathaniel Clyne'},
  {key: 'Dejan Lovren'},
  {key: 'Mama Sakho'},
  {key: 'Alberto Moreno'},
  {key: 'Emre Can'},
  {key: 'Joe Allen'},
  {key: 'Phil Coutinho'},
];


  RkTheme.setTheme({
    fonts: {
      sizes: {
        base: 18
      }
    }
  });

YellowBox.ignoreWarnings([
  'Warning: isMounted(...) is deprecated in plain JavaScript React classes.'
]);

  class SecondPage extends Component {
    static navigationOptions = ({navigation})=> ({
      title: 'SecondPage'.toUpperCase(),
      headerRight:  <Icon.Button name="plus" 
                      color = "#4158fd"
                      backgroundColor="transparent"
                      onPress={() => navigation.navigate('Add')} >
                    </Icon.Button>,
      headerStyle:{
        backgroundColor :'white'
      }    
    });


    constructor(props) {
      super(props);
      this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
      this.state = {
        data:datas
      };
      this.renderRow = this._renderRow.bind(this);
      this.filter = this._filter.bind(this);
      this.setData = this._setData.bind(this);
  }

  _renderRow(row) {
    let name = `${row.key}`;
    return (
        <View style={styles.container}>
          <RkText>{name}</RkText>
        </View>
    )
  }

 _filter(text) {
    let pattern = new RegExp(text, 'i');

    let result = datas.filter((datas) => {
      if (datas.key.search(pattern) != -1)
        return datas
      });

      this.setData(result);
  }

  _setData(data) {
    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.setState({
      data: data
    })
  }

  render() {

    return (
      <Container>

        <SearchBar
          lightTheme
          round
          onChangeText={this.filter}
          icon={{ type: 'font-awesome', name: 'search' }}
          placeholder='Search' 
          containerStyle={{ backgroundColor: '#f2f2f2' }}
          inputStyle={{ backgroundColor: '#fff' }}/>

        <ListView
          style={styles.root}
          dataSource={this.ds.cloneWithRows(this.state.data)}
          renderRow={this.renderRow}
          renderSeparator={this.renderSeparator}
          enableEmptySections={true}
        />

      </Container>
    );
  }
}


export default createStackNavigator({
  Second: {
    screen: SecondPage
  },
  Add:{
    screen: ThirdPage
  },
},{
    initialRouteName: 'Second',
  }
);



let styles = RkStyleSheet.create(theme => ({
  root: {
    backgroundColor: theme.colors.screen.base
  },
  searchContainer: {
    backgroundColor: theme.colors.screen.bold,
    paddingHorizontal: 16,
    paddingVertical: 10,
    height: 60,
    alignItems: 'center'
  },
  container: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center'
  },
  avatar: {
    marginRight: 16
  },
  separator: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: theme.colors.border.base
  }
}));