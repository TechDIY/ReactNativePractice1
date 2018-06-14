
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


type Props = {};

YellowBox.ignoreWarnings([
  'Module RCTImageLoader requires main queue setup since it overrides'
]);

export default class HomePage extends Component  {
  
  componentDidMount () {
    //setTimeout(() => this.setState({text: this._sourceData1}), 100);
  };

  constructor(props) {
    super(props);
    
    this.value = 0;
    this.state = {
      isClick : false,
      error: false,
      page: 1,
      refreshing: false,
      loading: false,
      data: this._sourceData,
      frontAnimatedStyle:0
    };

    this.renderItem = this._renderItem.bind(this);
    this.Animations = this.state.data.map( (item,i) => new Animated.Value(0) );
  }

  CardOnClick(i) {

    if (this.value >= 90) {
      Animated.spring(this.Animations[i],{
        toValue: 0,
        friction: 8,
        tension: 10         
      }).start();
    
      const newData = [...this.state.data];  // 按下按鈕後更新 Array
      newData.splice(i, 1, this._sourceData[i]);
      this.setState({ data: newData });

    } else {
      Animated.spring(this.Animations[i],{
        toValue: 180,
        friction: 8,
        tension: 10
      }).start();

      const newData = [...this.state.data];
      newData.splice(i, 1, this._sourceData1[i]);
      this.setState({ data: newData });
    }
  }

  _sourceData = [
    {name: '大護法'},
    {name: '繡春刀II：修羅戰場'},
    {name: '神偷奶爸3'},
    {name: '神奇女俠'},
    {name: '摔跤吧，爸爸'},
    {name: '悟空傳'},
    {name: '閃光少女'},
    {name: '攻殼機動隊'},
    {name: '速度與激情8'},
    {name: '蝙蝠俠大戰超人'},
    {name: '攻殼機動隊'},
    {name: '速度與激情8'},
    {name: '蝙蝠俠大戰超人'}
  ]


  _sourceData1 = [
    {name: '1'},
    {name: '2'},
    {name: '3'},
    {name: '4'},
    {name: '5'},
    {name: '6'},
    {name: '7'},
    {name: '8'},
    {name: '9'},
    {name: '10'},
    {name: '11'},
    {name: '12'},
    {name: '13'}    
  ]

  

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

    const backInterpolate = this.Animations[info.index].interpolate({
      inputRange: [0, 180],
      outputRange: ['180deg', '360deg']
    })

    const frontAnimatedStyle = {
      transform: [
        { rotateY: frontInterpolate}
      ], 
    }

    const backAnimatedStyle = {
      transform: [
        { rotateY: '180deg' }
      ]
    }

    this.Animations[info.index].addListener(({ value }) => {
      this.value = value;
    })



    return (
      <TouchableWithoutFeedback 
        onPress={() => this.CardOnClick(info.index)}>
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
              
              <Animated.View style={[frontAnimatedStyle]}>
                <Text style={styles.cardText}>
                  {info.item.name}
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
          data={this.state.data}
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
    backfaceVisibility: 'hidden',
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
