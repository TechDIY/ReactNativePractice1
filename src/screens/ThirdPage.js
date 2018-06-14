import React, { Component } from 'react';
import { Container, Content } from 'native-base';
import { ScrollView } from 'react-native';

import {
  RkStyleSheet,RkText,RkTextInput,RkButton
} from 'react-native-ui-kitten';         

export default class ThirdPage extends Component  {
    static navigationOptions = ({navigation})=> ({
      title: 'ThirdPage'.toUpperCase(),
      headerStyle:{
        backgroundColor :'white'
      }   
    });

    constructor(props) {
    	super(props);
    		this.state = {
      		selected2: undefined
    	};
  	}

    render() {
        return ( 
        	<Container>
          	<Content>
              <ScrollView contentContainerStyle={styles.contentContainer}>
          		<RkText style={styles.textTitle}>單字</RkText>
              <RkTextInput 
                labelStyle={{color: 'white'}}
                autoCapitalize='none'
                style={styles.textinput}/>

              <RkText style={styles.textTitle}>字意</RkText>
              <RkTextInput 
                labelStyle={{color: 'white'}}
                autoCapitalize='none'
                style={styles.textinput}/>

              <RkText style={styles.textTitle}>例句</RkText>
              <RkTextInput 
                labelStyle={{color: 'white'}}
                autoCapitalize='none'
                style={styles.inputSentences}/>
              <RkButton 
              style={styles.Button}
              rkType='stretch'>確定</RkButton>
              </ScrollView>
        		</Content>
      		</Container>
        );
    }
}



let styles = RkStyleSheet.create(theme => ({
  root: {
    backgroundColor: theme.colors.screen.base
  },
  textTitle:{
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
  },
  textinput :{
    marginLeft: 20,
    marginRight: 20,
    height:40 ,
    backgroundColor: 'white'
  },
  inputSentences :{
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 20,
    height:160 ,
    backgroundColor: 'white'
  },
  Button:{
   margin: 20,
  },
  contentContainer: {
    paddingVertical: 20
  }
}));