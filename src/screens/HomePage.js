
import React, { Component } from 'react';

import {
  ScrollView,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Animated,
  View,
  TouchableWithoutFeedback,
  Easing,
  YellowBox
} from 'react-native';

import { 
  Container
} from 'native-base';

import { 
  Header,
  Card,
  Button,
  Text 
} from 'react-native-elements';

import {
  RkText,
  RkCard, RkStyleSheet
} from 'react-native-ui-kitten';

import LevelBar from '../components/LevelBar';
import {data} from '../data';

import * as firebase from 'firebase';
import { firebaseConfig } from '../configs/config';
const firebaseApp = firebase.app();
const rootRef = firebaseApp.database().ref();


type Props = {};

YellowBox.ignoreWarnings([
  'Module RCTImageLoader requires main queue setup since it overrides'
]);

export default class HomePage extends Component  {
  
  componentDidMount () {
  
    var onValueChange = rootRef.child('vocabulary').on("value", snapshot => {
      const snapshotData = snapshot.val();
  
      var alllist = []
      var listkey = []
      var list = []
      snapshot.forEach(childSnapshot => {
        const key = childSnapshot.key;
        const childData = childSnapshot.val();
        listkey.push({key:key})
        alllist.push({data:childData})
        list.push({value:childData.word})
        this.Animations = list.map((array,index) => new Animated.Value(0) );
        this.setState({ AllData: alllist });
        this.setState({ ListData: list });
        console.log("dsfsdfsd",alllist)
        console.log("dsfsdfsd",this.state.ListData)
      })
    })
  }

  componentWillUnmount () {
    ref.off('value', onValueChange);
  }

  constructor(props) {
    super(props);  
    
    this.value = 0;
    this.state = {
      isClick : false,
      error: false,
      page: 1,
      refreshing: false,
      loading: false,
      ListData: [],
      AllData:[],
      frontAnimatedStyle:0
    };

    this.renderItem = this._renderItem.bind(this);
    
  }

  CardOnClick(info) {
    console.log("asdasd",this.state.AllData[info.index].data.word)
    if (this.value >= 90) {
      Animated.spring(this.Animations[info.index],{
        toValue: 0,
        friction: 8,
        tension: 10         
      }).start();
    
      const newData = [...this.state.ListData];  // 按下按鈕後更新 Array
      newData.splice(info.index, 1, {"value":this.state.AllData[info.index].data.word});
      this.setState({ ListData: newData });
    } else {
      Animated.spring(this.Animations[info.index],{
        toValue: 180,
        friction: 8,
        tension: 10
      }).start();

      const newData = [...this.state.ListData];
      newData.splice(info.index, 1, {"value":this.state.AllData[info.index].data.mean});
      this.setState({ ListData: newData });
    }
  }  

  _keyExtractor = (item, index) => index.toString();



   
  createEmptyView() {
    return (
        <Text style={{fontSize: 40, alignSelf: 'center'}}>還沒有數據哦！</Text>
    );
  }


  _renderItem(info) {
    
    const frontInterpolate = this.Animations[info.index].interpolate({
      inputRange: [0, 180],
      outputRange: ['0deg', '180deg'],
    });

    const frontAnimatedStyle = {
      transform: [
        { rotateY: frontInterpolate}
      ], 
    }

    const frontInterpolate1 = this.Animations[info.index].interpolate({
      inputRange: [0, 180],
      outputRange: ['0deg', '180deg'],
    });

    const frontAnimatedStyle1 = {
      transform: [
        { rotateY: frontInterpolate1}
      ], 
    }

    this.Animations[info.index].addListener(({ value }) => {
      this.value = value;
    })



    return (
      <TouchableWithoutFeedback 
        onPress={() => this.CardOnClick(info)}>
        <Animated.View style={[frontAnimatedStyle]}>
          
          <Card
            title=''
            containerStyle={{
              marginRight: 30,
              marginLeft: 30,
              borderRadius: 20,
              borderWidth: 1,
              borderColor: '#fff',
              borderBottomWidth: 0,
              shadowColor: '#000',
              shadowOffset: { width: 0.1, height: 1 },
              shadowOpacity: 0.3 ,
              shadowRadius: 2,
              elevation: 1}}>       
              
              <Animated.View style={[frontAnimatedStyle1]}>
                <Text style={styles.cardText}>
                  {info.item.value}
                </Text>

                <View rkCardFooter>
                  <LevelBar/>
                </View >
              </Animated.View> 
          </Card>
        </Animated.View>
      </TouchableWithoutFeedback>      
    )
  }  

  render() {

    return ( 
      <Container>
        <Header 
          centerComponent={{ text: '練習', style: { color: '#000',fontSize:18 } }}
          outerContainerStyles={{ backgroundColor: '#fff' }}
        /> 
        
        <FlatList
          ListEmptyComponent={this.createEmptyView()}
          data={this.state.ListData}
          renderItem={this.renderItem}
          keyExtractor={this._keyExtractor}
          style={styles.container}/>
        </Container>
    );
  }
}


let styles = RkStyleSheet.create(theme =>({
  container: {
    flex: 1
  },
  flipCard: {
    backgroundColor: 'blue'
  },
  flipCardBack: {
    top: 0,
    backgroundColor: 'red',
  },
  cardText:{
    fontSize: 18,
    textAlign: 'center'
  }
}));
