import React, { Component } from 'react';
import { Container, Content } from 'native-base';
import { ScrollView,Alert} from 'react-native';
import {
  RkStyleSheet,RkText,RkTextInput,RkButton
} from 'react-native-ui-kitten';         
import * as firebase from 'firebase';
import { firebaseConfig } from '../configs/config';
const firebaseApp = firebase.app();
const rootRef = firebaseApp.database().ref();

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
      		word: "",
          mean:"",
          sentences:"",
    	};
      this.updateWord = this._updateWord.bind(this);
  	}

    _updateWord(){
      var year  = new Date().getFullYear();
      var month = new Date().getMonth()+1;
      var date  = new Date().getDate();

      if (this.state.word !="" && this.state.mean !="" && this.state.sentences !=""){
        rootRef.child('vocabulary').push().set({
            word:this.state.word,
            mean:this.state.mean,
            sentences:this.state.sentences,
            level:1,
            date: year + "-" + month + "-" + date,
        })
        .then(function() {
          Alert.alert(
            '成功',
            '成功新增一個單字囉!',
          )
        })
        .catch(function(err) {
          console.log('error', err);
        });
      }
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
                  style={styles.textinput}
                  onChangeText={(text) => this.state.word = text}/>
                <RkText style={styles.textTitle}>字意</RkText>
                <RkTextInput 
                  labelStyle={{color: 'white'}}
                  autoCapitalize='none'
                  style={styles.textinput}
                  onChangeText={(text) => this.state.mean = text}/>
                <RkText style={styles.textTitle}>例句</RkText>
                <RkTextInput 
                  labelStyle={{color: 'white'}}
                  autoCapitalize='none'
                  style={styles.inputSentences}
                  onChangeText={(text) => this.state.sentences = text}/>
                <RkButton 
                  style={styles.Button}
                  onPress={() => this.updateWord()}
                  rkType='stretch'>確定
                </RkButton>
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