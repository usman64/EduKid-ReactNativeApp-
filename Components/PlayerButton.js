import React from 'react';
import {View,TouchableHighlight} from 'react-native';


const PlayerButton = (props) => (
    <TouchableHighlight 
        onPressIn={props.myPress}
        underlayColor={props.feedbackColor}
        style={{flex:1,backgroundColor:props.feedbackColor}}
    >
      <View>{props.playerId}</View>
    </TouchableHighlight>
)

export default PlayerButton