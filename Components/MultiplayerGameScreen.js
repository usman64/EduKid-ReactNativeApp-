import React, {Component} from 'react';
import {View,Text,StyleSheet, TouchableHighlight, Alert,StatusBar } from 'react-native';
import {CountDown} from './CountDown'
import styles from './styles'
import capital from '../Games/capital'
import color from '../Games/colors'
import homo from '../Games/homo'
import math from '../Games/math'


const win = 'lawngreen'
const loss = 'red'
const defaultColor = 'rgb(211,211,211)'


const PlayerButton = (props) => (
    <TouchableHighlight 
        onPressIn={props.myPress}
        underlayColor={props.player}
        style={{flex:1,backgroundColor:props.player}}
    >
      <View></View>
    </TouchableHighlight>
)

const Questions = props => (
    <View style={{flex:2, paddingTop: 200, paddingLeft:100}}>
        <Text>{props.question}</Text>
    </View>
)
  
  

export default class MultiplayerGameScreen extends Component {

    static navigationOptions = {
        header: null
    }

    constructor(props) {
        super(props)
        this.state = {
            count: 3,
            showCountDown: true,
            player1_status: defaultColor,
            player2_status: defaultColor,
            gameArray: [capital, color, homo, math],
            currentGame: [],
            question: '',
            currentQ:'',
            currentA: '',
        }
    }

    gameSelection = () => {
        const { gameArray } = this.state 
        let random = Math.round(Math.random() * (gameArray.length-1))
        console.log(random)
        let currentGame = gameArray[random]
        if(currentGame == homo) {
            this.setState({question: 'Hit if homophones'})
            let random = Math.round(Math.random() * (homo.length-1))
            let myquestion =  
                <Text style={{fontSize: 30}}>
                    <Text>Word1: <Text style={{color: 'green'}}>{homo[random].word1}</Text>{`\n`}</Text>
                    <Text>Word2: <Text style={{color: 'red'}}>{homo[random].word2} </Text></Text>
                </Text>
            let answer = homo[random].answer
            this.setState({currentQ: myquestion, currentA: answer})
        }

        else if(currentGame == color) {
            this.setState({question: 'Hit when the colors match'})
             let random = Math.round(Math.random() * (color.length-1))
            console.log(random)
            let myquestion = 
                <Text style={{fontSize: 30, color: color[random].color, fontWeight: 'bold'}}>{color[random].name}</Text>
            let answer = color[random].answer
            console.log(color[random].color)
            this.setState({currentQ: myquestion, currentA: answer})
        }

        else if(currentGame == capital) {
            this.setState({question: 'Hit when pair is correct'})
            let random = Math.round(Math.random() * (capital.length-1))
            console.log(random)
            let myquestion = 
                <Text style={{fontSize: 30}}>
                    <Text>Country: <Text style={{color: 'green'}}>{capital[random].country}</Text>{`\n`}</Text>
                    <Text>Capital: <Text style={{color: 'red'}}>{capital[random].capital} </Text></Text>
                </Text>
            let answer = capital[random].answer
            this.setState({currentQ: myquestion, currentA: answer})
        }

        else if(currentGame == math) {
            this.setState({question: 'Hit when equations are correct'})
            let random = Math.round(Math.random() * (math.length-1))
            console.log(random)
            let myquestion =  <Text style={{fontSize: 30, color: 'green'}}>{math[random].exp}</Text>
            let answer = math[random].answer
            this.setState({currentQ: myquestion, currentA: answer})
        }

    }

    componentDidMount(){
        this.gameSelection();
        this.interval=setInterval(()=> this.decrementCount(),1000)
    }

    componentWillUnmount(){
        clearInterval(this.interval)
    }


    myPress1 = () => {
        if(this.state.player2_status === defaultColor && this.state.player1_status === defaultColor)
        {
        this.setState({player1_status: win}, () => setTimeout(() => this.setState({player1_status:defaultColor}), 1000))
        // Alert.alert('Player1_status') 
        }
        
    }

    myPress2 = () => {
    if(this.state.player1_status === defaultColor && this.state.player2_status === defaultColor)
    {
        this.setState({player2_status: loss}, () => setTimeout(() => this.setState({player2_status:defaultColor}), 1000))
        // Alert.alert('Player2_status')
    }
    
    }


    decrementCount=()=> {
        this.setState(prevState => ({count: prevState.count - 1}))
        if(this.state.count < 1) {
            this.setState({count: null, showCountDown: false, showRest: true})
        }
    }

    render(){
        if(this.state.showCountDown) {
            return <CountDown count={this.state.count} />
        }

        return(
            <View style={mystyles.container}>
                {/* <StatusBar hidden={true} /> */}
                <PlayerButton player={this.state.player1_status} myPress={this.myPress1}/>
                <Questions question={this.state.currentQ}/>
                <PlayerButton player={this.state.player2_status} myPress={this.myPress2} />
            </View>
        )
    }
}

const mystyles = StyleSheet.create({
    container: {
      flex: 1,
      // paddingTop: Constants.statusBarHeight,
      backgroundColor: '#ecf0f1',
      padding: 0,
    },
    button: {
      flex:1,
      backgroundColor: 'blue'
    },

    textStyle: {
        fontSize: 20,
        color: 'green'
    }
  });
  