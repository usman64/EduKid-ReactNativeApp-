import React from 'react';
import {View,Text} from 'react-native';

const Question = props => (
    <View style={{flex:1,justifyContent:'flex-end',padding:0, marginLeft:'auto', marginRight:'auto'}}>
        <Text>{props.question}</Text>
    </View>
)

export default Question