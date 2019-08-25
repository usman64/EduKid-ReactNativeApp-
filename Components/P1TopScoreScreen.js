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

export default class P1TopScoreScreen extends Component {

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
        let thestring = this.thegame + this.time
        try {
            let decision = await UpdateDatabaseWithScore(this.uid, thestring, thepoints);
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
        let thestring = this.thegame + this.time
        const thescores = await LocalHighscore(this.uid, thestring);
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
            <View style = {[styles.container, {paddingTop: 30}]}>
                <Text style = {styles.welcome}>Top Score Screen</Text>
                <View>{text}</View>

                <View style={{paddingTop: 30}}>
                    <UserTopScores scores={this.state.userHigh} points={this.state.points}/>
                </View>

                <View style={[mystyle.buttons]}>
                    <TouchableOpacity onPress={()=> {
                        this.props.navigation.navigate('Player1')
                        
                    }}>
                        <View style={[mystyle.mybutton, {backgroundColor: 'grey'}]}>
                            <Text style={styles.buttonText}>ANOTHER GAME?</Text>
                        </View>
                    </TouchableOpacity>

                    <View style={{paddingLeft: 20}}></View>

                    <TouchableOpacity onPress={()=> {
                        this.props.navigation.navigate('Home')
                    }}>
                        <View style={[mystyle.mybutton, {backgroundColor: 'grey'}]}>
                            <Text style={styles.buttonText}>HOME</Text>
                        </View>
                    </TouchableOpacity>
                </View>

        
            </View>
        )
    }
}


const mystyle = new StyleSheet.create({
    buttons : {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems:"center",
        paddingTop: 140,
    },

    mybutton: {
        width: 180,
        borderColor: 'grey',
        borderWidth: 1,
        height:100,
        padding:10,
        borderRadius:12,
        marginTop:20,
        backgroundColor:'grey',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: 'silver',
        shadowOffset: {
          width: 0,
          height: 4
        },
        shadowRadius: 5,
        shadowOpacity: 0.8
    },
})
