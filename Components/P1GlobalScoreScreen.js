import React, { Component } from 'react'
import { StyleSheet, Button , Text, View, TextInput, TouchableOpacity, BackHandler, ToastAndroid, Alert} from 'react-native';
import styles from './styles'
import Firebase from '../Server/firebase'
import { HeaderBackButton } from 'react-navigation';
import { GlobalHighscore } from '../Server/firebaseFunc'

const DisplayGlobal = props => {
    let color1='green'
    let color2='red'
    let constant = color2;
    return props.names.map((name, index) => {
        let score = props.scores[index]
        

        if(score == props.myscore) {
            constant=color1;
        }

        else {
            constant=color2;
        }
        return (
            <View key={index}><Text style={{fontSize: 25, color: constant}}>{index +1}.
                    {`\t\t\t\t\t${name}\t\t\t\t\t\t`} 
                    <Text>{score}</Text>
            </Text></View>
        )
    })
}

export default  class P1GlobalScoreScreen extends Component {

    constructor(props) {
        super(props)
        this.state= {
            global: [],
            names: [],
            scores:[]
        }
    }

    thegame = this.props.navigation.getParam('game')
    uid = Firebase.auth().currentUser.uid
    user = this.props.navigation.getParam('user')
    time = this.props.navigation.getParam('time')
    name = this.props.navigation.getParam('name')


    globalScores = () => {
        this.state.global.forEach(async(score,index) => {
            await this.getName(score.user)
            this.setState(prevState => ({scores: [...prevState.scores, score.score]}))
            
        })
    }
    
    handleBackButton=() => {
        this.props.navigation.navigate('Home')
        return true
    }

    globalHighScore = async() => {
        let thestring=this.thegame + this.time
        const global = await GlobalHighscore(thestring);
        this.setState({global: global})
    }

    getName = async(user) => {
        Firebase.database().ref('/users/' + user).once('value',snapshot => {
            const object = snapshot.val()
            console.log(object.name)
            this.setState(prevState => ({names: [...prevState.names, object.name]}))
        }) 
    }

    componentDidMount() {
        this.globalHighScore().then(()=> {
            this.globalScores();
        })
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
      
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    }
    render() {
        
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>Global screen</Text>
                <Text style={{fontSize: 30}}>Here are the Top 10 best scores!</Text>

                <DisplayGlobal names={this.state.names}
                                scores={this.state.scores}
                                myscore={this.props.navigation.getParam('points')}
                />
                
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
