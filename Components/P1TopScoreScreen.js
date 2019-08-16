import React, { Component } from 'react'
import { StyleSheet, Button , Text, View, TextInput, TouchableOpacity, BackHandler, ToastAndroid} from 'react-native';
import styles from './styles'

export class P1TopScoreScreen extends Component {

    handleBackButton=() => {
            ToastAndroid.show('Back Button is not allowed', ToastAndroid.SHORT);
            return true;
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
                <Text>Top Score Screen Reached</Text>
                <Button title='Home' onPress={()=> {
                    this.props.navigation.navigate('Home')
                }}/>
            </View>
        )
    }
}

export default P1TopScoreScreen
