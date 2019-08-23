import React, { Component } from 'react'
import { StyleSheet, Button , Text, View, TextInput, TouchableOpacity, BackHandler, ToastAndroid, Alert} from 'react-native';
import styles from './styles'
import Firebase from '../Server/firebase'
import { HeaderBackButton } from 'react-navigation';

export class P1GlobalScoreScreen extends Component {
    // static navigationOptions = ({navigation}) => ({
    // })


    handleBackButton=() => {
        this.props.navigation.navigate('Home')
        return true
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
      
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    }
    render() {
        
        return (
            <View>
                <Text>This is the global screen</Text>
            </View>
        )
    }
}

export default P1GlobalScoreScreen
