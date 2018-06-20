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
  Container,List, ListItem,Button
} from 'native-base';

import { 
  Header,
  SearchBar 
} from 'react-native-elements';

import {FontAwesome} from '../assets/icons';

import ThirdPage from './ThirdPage';

import { createStackNavigator } from 'react-navigation';

import Icon from 'react-native-vector-icons/FontAwesome';

import * as firebase from 'firebase';
import { firebaseConfig } from '../configs/config';
const firebaseApp = firebase.app();
const rootRef = firebaseApp.database().ref();

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

componentDidMount () {
  
    rootRef.child('vocabulary').on("value", snapshot => {
      const key = snapshot.key;
      const snapshotData = snapshot.val();
     
      var list = []
      var listKey = []
      snapshot.forEach(childSnapshot => {
        const key = childSnapshot.key;
        const childData = childSnapshot.val();
        console.log("key",key)
        console.log("tetwetwe",childData);
        listKey.push({key:key.word})
        list.push({data:childData})
        this.setState({ AllData: list,ListData:list });
      })
    })
  }


    constructor(props) {
      super(props);
      this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
      this.state = {
        AllData:[],
        ListData:[],
      };
      this.renderRow = this._renderRow.bind(this);
      this.filter = this._filter.bind(this);
      this.setData = this._setData.bind(this);
  }

  _renderRow(row) {
    let word = `${row.data.word}`;
    return (
      <ListItem>
        <View style={styles.container}>
          <RkText>{word}</RkText>
        </View>
      </ListItem>
    )
  }

 _filter(text) {
    let pattern = new RegExp(text, 'i');

    let result = this.state.AllData.filter((item) => {
      if (item.data.word.search(pattern) != -1)
        return item
      });
      this.setData(result);
  }

  _setData(data) {
    let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.setState({
      ListData: data
    })
  }

  deleteRow(data,secId, rowId, rowMap) {
    rowMap[`${secId}${rowId}`].props.closeRow();
    const newData = [...this.state.ListData];
    newData.splice(rowId, 1);
    this.setState({ ListData: newData });
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

        <List
          style={styles.root}
          dataSource={this.ds.cloneWithRows(this.state.ListData)}
          renderRow={this.renderRow}
          renderSeparator={this.renderSeparator}
          enableEmptySections={true}
          renderRightHiddenRow={(data, secId, rowId, rowMap) =>
            <Button full danger onPress={_ => this.deleteRow(data,secId, rowId, rowMap)}>
              <Icon active name="trash" />
            </Button>}
          rightOpenValue={-75}
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