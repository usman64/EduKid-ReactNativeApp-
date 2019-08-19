import React from 'react';
import {View,Text,TouchableHighlight,StyleSheet} from 'react-native';
import { AuthSession } from 'expo';


const PlayerButton = (props) => (
    <TouchableHighlight 
        onPressIn={props.myPress}
        underlayColor={props.feedbackColor}
        style={{flex:1,backgroundColor:props.feedbackColor}}
    >
        <Text style={mystyles.playerId}>{props.playerId}</Text>
    </TouchableHighlight>
)

export default PlayerButton


mystyles = StyleSheet.create({
    
    playerId: {
            color:'white',
            fontWeight:'bold',
            fontSize:30,
            marginTop: 'auto',
            marginLeft: 'auto',
            marginRight: 'auto'

        }
})