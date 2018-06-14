import React from 'react';
import {
  View
} from 'react-native';
import {
  RkText,
  RkButton,
  RkComponent,
  RkStyleSheet
} from 'react-native-ui-kitten';

import {FontAwesome} from '../assets/icons';
import Icon from 'react-native-vector-icons/FontAwesome';


export default class LevelBar extends React.Component  {

  constructor(props) {
    super(props);

    this.likes = this.props.likes || "Yes";
    this.comments = this.props.comments || "So";
    this.shares = this.props.shares || "No";
    this.state = {
      likes: this.likes,
      comments: this.comments,
      shares: this.shares,
    }
  }

	render() {

    let likes = this.state.likes + (this.props.showLabel ? ' Likes' : '');
    let comments = this.state.comments + (this.props.showLabel ? ' Comments' : '');
    let shares = this.state.shares + (this.props.showLabel ? ' Shares' : '');


		return (
      <View style={styles.container}>
        <View style={styles.section}>
          <RkButton rkType='clear' >
            <Icon.Button name="smile-o" 
                  color = "#00c313"
                  backgroundColor="transparent"
                  style={styles.icon} >
              <RkText rkType='primary4 hintColor' style={styles.label}>{likes}</RkText>
            </Icon.Button>
          </RkButton>
        </View>
        <View style={styles.section}>
          <RkButton rkType='clear'>
            <Icon.Button name="meh-o" 
                  color = "#f6632c"
                  backgroundColor="transparent"
                  style={styles.icon} >
              <RkText rkType='primary4 hintColor' style={styles.label}>{comments}</RkText>
            </Icon.Button>
          </RkButton>
        </View>
        <View style={styles.section}>
          <RkButton rkType='clear' >
             <Icon.Button name="frown-o" 
                  color = "#b91216"
                  backgroundColor="transparent"
                  style={styles.icon} >
              <RkText rkType='primary4 hintColor' style={styles.label}>{shares}</RkText>
            </Icon.Button>
          </RkButton>
        </View>
      </View>
		)
	}
}


let styles = RkStyleSheet.create(theme =>({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1
  },
  section: {
    justifyContent: 'center',
    flexDirection: 'row',
    flex: 1,
  },
  icon: {
     marginTop: 10,
  },
  label: {
    marginLeft: 8,
    alignSelf: 'flex-end'
  }
}));