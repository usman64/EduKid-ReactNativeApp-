import React, { Component } from 'react'
import { StyleSheet, Button , Text, View, TextInput, TouchableOpacity, BackHandler, Alert} from 'react-native';
import styles from './styles'
import { UpdateDatabaseWithScore, LocalHighscore } from '../Server/firebaseFunc'
import Firebase from '../Server/firebase'

const UserTopScores = props => {
    return props.scores.map((score,index) => {
        // if(props.points === score) {
        //     return (
        //         <View key={index}><Text style={{fontSize: 20}}>{index +1}. 
        //             <Text style={{color: 'red'}}>{score}</Text>
        //         </Text></View>
        //     )
        // }
       
        <View key={index}><Text style={{fontSize: 20}}>{index +1}. 
                <Text style={{color: 'grey'}}>{score}</Text>
        </Text></View>
      
       
    })
}

export class P1TopScoreScreen extends Component {

    static navigationOptions = {
        header: null
    }

    points = this.props.navigation.getParam('points')
    thegame = this.props.navigation.getParam('game')
    uid = Firebase.auth().currentUser.uid

    constructor(props) {
        super(props)
    }

    userHigh = [];

    handleBackButton=() => {
            ToastAndroid.show('Back Button is not allowed', ToastAndroid.SHORT);
            return true;
    }

    pointsStoring = async() => {
        try {
            let decision = await UpdateDatabaseWithScore(this.uid, this.thegame, this.points);
            if(decision) {
                console.log('Points Stored')
            }

            else {
                console.log('Nah not happening')
            }
        }

        catch(err) {
            console.log(err)
        }
    }

    userHighScores = async() => {
        await this.pointsStoring()
        const thescores = await LocalHighscore(this.uid, this.thegame);
        this.userHigh = thescores;
        console.log(this.userHigh)


    }

    componentDidMount() {
        this.userHighScores()
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
      
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    }

    render() {
        let thename = this.props.navigation.getParam('name')
        let points = this.props.navigation.getParam('points')
        let text = 
            <Text style={{fontSize: 30, paddingTop: 50}}>
                Congratulations, you got <Text style={{color: 'green'}}>{points}</Text> points!
            </Text>

        return (
            <View style = {styles.container}>
                <Text style = {styles.welcome}>Top Score Screen</Text>
                <View>{text}</View>
                <Button title='Home' onPress={()=> {
                    this.props.navigation.navigate('Home')
                }}/>

                <View style={{paddingTop: 30}}>
                    <UserTopScores scores={this.userHigh} points={this.points}/>
                </View>
            </View>
        )
    }
}

export default P1TopScoreScreen
