import React, { Component } from 'react'
import { StyleSheet, Button , Text, View, TextInput, TouchableOpacity, BackHandler, Alert, ToastAndroid} from 'react-native';
import styles from './styles'
import { UpdateDatabaseWithScore, LocalHighscore } from '../Server/firebaseFunc'
import Firebase from '../Server/firebase'
import { HeaderBackButton } from 'react-navigation';
import { TouchableHighlight } from 'react-native-gesture-handler';

const UserTopScores = props => {
    return props.scores.map((score,index) => {
        if(score === props.points) {
            return (
                <View key={index}><Text style={{fontSize: 30}}>{index +1}.{'\t\t\t\t\t'} 
                    <Text style={{color: 'green'}}>{score}</Text>
                </Text></View>
            )  
        }

        else {
            return (
                <View key={index}><Text style={{fontSize: 30}}>{index +1}.{'\t\t\t\t\t'} 
                    <Text style={{color: 'red'}}>{score}</Text>
                </Text></View>
            )
        }
          
    })
}

const TwoButtons = props => (
    <View style={{paddingTop: 70, flexDirection: 'row', justifyContent: 'space-between'}}>
            <TouchableHighlight onPress ={()=> {
                props.navigation.navigate('Player1')
            }}>
                <View style={[styles.button,{width: 100,backgroundColor: 'grey'}]}>
                    <Text style={styles.buttonText}>Another Game ?</Text>
                </View>
            </TouchableHighlight>
        
            <TouchableHighlight onPress={()=> {
                props.navigation.navigate('Home')
            }}>
                <View style={[styles.button,{width: 100, backgroundColor: 'grey'}]}>
                    <Text style={styles.buttonText}>Home</Text>
                </View>
            </TouchableHighlight>
    </View>
)

export class P1TopScoreScreen extends Component {

    thegame = this.props.navigation.getParam('game')
    uid = Firebase.auth().currentUser.uid
    user = this.props.navigation.getParam('user')
    time = this.props.navigation.getParam('time')
    name = this.props.navigation.getParam('name')

    constructor(props) {
        super(props)
        this.state = {
            best: false,
            points: 0,
            userHigh: []
        }
    }


    handleBackButton=() => {
            this.props.navigation.navigate('Home')
            return true
    }

    pointsStoring = async() => {
        let thepoints = this.props.navigation.getParam('points')
        this.setState({points: thepoints})
        try {
            let decision = await UpdateDatabaseWithScore(this.uid, this.thegame, thepoints);
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
        this.setState({userHigh: thescores})
        if(thescores[0] === this.state.points) {
            Alert.alert('Congrats! Best Score')
        }


    }

    componentDidMount() {
        this.userHighScores()
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
      
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    }

    render() {
        let text = 
            <Text style={{fontSize: 20, paddingTop: 20}}>
                Congratulations, you got <Text style={{color: 'green'}}>{this.state.points}</Text> points!
            </Text>

        return (
            <View style = {styles.container}>
                <Text style = {styles.welcome}>Top Score Screen</Text>
                <View>{text}</View>

                <View style={{paddingTop: 30}}>
                    <UserTopScores scores={this.state.userHigh} points={this.state.points}/>
                </View>

                <TwoButtons navigation={this.props.navigation}
                            game={this.thegame}
                            name={this.name}
                            time={this.time}/>
            </View>
        )
    }
}

export default P1TopScoreScreen
