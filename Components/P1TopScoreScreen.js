import React, { Component } from 'react'
import { StyleSheet, Button , Text, View, TextInput, TouchableOpacity, BackHandler, ToastAndroid} from 'react-native';
import styles from './styles'
import { StorePoints } from '../Server/firebaseFunc'

export class P1TopScoreScreen extends Component {

    handleBackButton=() => {
            ToastAndroid.show('Back Button is not allowed', ToastAndroid.SHORT);
            return true;
    }

    pointsStoring = async() => {
        let theuser = this.props.navigation.getParam('user')
        let points = this.props.navigation.getParam('points')
        let thegame = this.props.navigation.getParam('game')

        try {
            await StorePoints(theuser,points,thegame)
        }

        catch(err) {
            console.log(err)
        }
    }
    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
      
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    }

    render() {
        let thename = this.props.navigation.getParam('name')
        let points = this.props.navigation.getParam('points')
        let text = 
            <Text style={{fontSize: 30}}>
                Hi <Text style={{color: 'pink'}}>{thename}</Text>, you got <Text style={{color: 'green'}}>{points}</Text> points!
            </Text>

        return (
            <View style = {styles.container}>
                <Text style = {styles.welcome}>Top Score Screen</Text>
                <View>{text}</View>
                <Button title='Home' onPress={()=> {
                    this.props.navigation.navigate('Home')
                }}/>
            </View>
        )
    }
}

export default P1TopScoreScreen
