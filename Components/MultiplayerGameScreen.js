import React, {Component} from 'react';
import {View,Text,StyleSheet,StatusBar,Vibration } from 'react-native';
import {CountDown} from './CountDown'
import capital from '../Games/capital'
import color from '../Games/colors'
import homo from '../Games/homo'
import math from '../Games/math'
import PlayerButton from './PlayerButton'
import Question from './Question'
import styles from './styles'
import { TouchableOpacity } from 'react-native-gesture-handler';


export const win = 'lawngreen'
export const loss = 'red'
export const defaultColor = 'grey'

let P1_hitTime = 0
let P2_hitTime = 0



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
            P1_score: 0,
            P2_score: 0,
            gameDuration: 60000, //60 secs
            gameEnded: false,
            showGoBack: false
        }
    }

    gameEndResult = () => {
        this.setState({gameEnded:true})
        this.goback = setTimeout(()=> this.setState({showGoBack:true}),5000)
        clearInterval(this.gameinterval)
        let result = ''
        let winner = ''
        if(this.state.P1_score === this.state.P2_score)
        {
            result= "Tie!"
        }
        else{
            let {P1_score, P2_score} = this.state
            result = P1_score > P2_score ? "Player 1 wins!" : "Player 2 wins!"
            winner = P1_score > P2_score ? "Player 1" : "Player 2"
        }

        const resultDisplay = <Text style={{fontSize: 30, color: 'black'}}>{result}</Text>

        let blinkingInterval = 500
        if(winner === "Player 1")
        {
            this.resultInterval1 = setInterval(()=>
            this.setState({player1_status: win}, () => setTimeout(() => this.setState({player1_status:defaultColor}),blinkingInterval))
            ,blinkingInterval*2)
        }
        else if(winner === "Player 2")
        {
            this.resultInterval2 = setInterval(()=>
            this.setState({player2_status: win}, () => setTimeout(() => this.setState({player2_status:defaultColor}),blinkingInterval))
            ,blinkingInterval*2)
        }
        else{
            this.resultInterval3 = setInterval(()=>
            this.setState({player2_status: win,player1_status:win}, () => setTimeout(() => this.setState({player2_status:defaultColor,player1_status:defaultColor}),blinkingInterval))
            ,blinkingInterval*2)
        }
        this.setState({currentQ:resultDisplay})

    }


    getCurrentTime = () => new Date().getTime()

    resetTimes = () => {
        P1_hitTime = 0
        P2_hitTime = 0
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
        this.interval=setInterval(()=> this.decrementCount(),1000)
        this.gameinterval=setInterval(()=> {
            this.gameSelection()
            this.resetTimes()
        }
        ,3000)

        this.gameTime = setTimeout(() => this.gameEndResult(), this.state.gameDuration)
    }

    componentWillUnmount(){
        clearInterval(this.gameinterval)
        clearInterval(this.resultInterval1)
        clearInterval(this.resultInterval2)
        clearInterval(this.resultInterval3)
        clearTimeout(this.gameTime)
        clearTimeout(this.goback)
    }


    // myPress1 = () => {
    //     if(this.state.player2_status === defaultColor && this.state.player1_status === defaultColor)
    //     {
    //         this.setState({player1_status: win}, () => setTimeout(() => this.setState(prevState => ({player1_status:defaultColor, P1_score:this.incrementScore(prevState.P1_score)})), 1000))
    //         Vibration.vibrate(100)
    //     }
        
    // }

    // myPress2 = () => {
    //     if(this.state.player1_status === defaultColor && this.state.player2_status === defaultColor)
    //     {
    //         this.setState({player2_status: win}, () => setTimeout(() => this.setState(prevState => ({player2_status:defaultColor, P2_score:this.incrementScore(prevState.P2_score)})), 1000))
    //         Vibration.vibrate(100)
    //     }
    
    // }

    myPress1 = () => {
        if(!this.state.gameEnded)
        {
            P1_hitTime = this.getCurrentTime()
            let copyP2_hitTime = P2_hitTime
            if(P1_hitTime < copyP2_hitTime && copyP2_hitTime || P1_hitTime > copyP2_hitTime && !copyP2_hitTime)
            {
                if(this.state.currentA)
                {
                    this.setState({player1_status: win}, () => setTimeout(() => this.setState(prevState => ({player1_status:defaultColor, P1_score:this.incrementScore(prevState.P1_score)})), 1000))
                }
                else
                {
                    this.setState({player1_status: loss}, () => setTimeout(() => this.setState(prevState => ({player1_status:defaultColor, P1_score:this.decrementScore(prevState.P1_score)})), 1000))
                }
            }
            // else{
            //     this.setState({player1_status: loss}, () => setTimeout(() => this.setState(prevState => ({player1_status:defaultColor, P1_score:prevState.P1_score + 10})), 1000))
            // }
            Vibration.vibrate(50)
        }
}

    myPress2 = () => {
        if(!this.state.gameEnded)
        {
            P2_hitTime = this.getCurrentTime()
            let copyP1_hitTime = P1_hitTime
            if(P2_hitTime < copyP1_hitTime && copyP1_hitTime || P2_hitTime > copyP1_hitTime && !copyP1_hitTime)
            {
                if(this.state.currentA)
                {
                    this.setState({player2_status: win}, () => setTimeout(() => this.setState(prevState => ({player2_status:defaultColor, P2_score:this.incrementScore(prevState.P2_score)})), 1000))
                }
                else
                {
                    this.setState({player2_status: loss}, () => setTimeout(() => this.setState(prevState => ({player2_status:defaultColor, P2_score:this.decrementScore(prevState.P2_score)})), 1000))
                }
            }
            // else{
            //     this.setState({player2_status: win}, () => setTimeout(() => this.setState(prevState => ({player2_status:defaultColor, P2_score:prevState.P2_score + 10})), 1000))
            // }
            Vibration.vibrate(50)
        }
    }


    decrementCount=()=> {
        this.setState(prevState => ({count: prevState.count - 1}))
        if(this.state.count < 1) {
            this.setState({count: null, showCountDown: false,}, () =>  clearInterval(this.interval))
        }
    }

    incrementScore = (prevState_score) => prevState_score + 1

    decrementScore = (prevState_score) => prevState_score - 1

    render(){
        if(this.state.showCountDown) {
            return <CountDown count={this.state.count} />
        }

        return(
            <View style={mystyles.container}>
                <StatusBar hidden={true} />

                <View style={{flex:1, transform: [{ rotate: '180deg', }]}} >
                    <Question question={this.state.currentQ}/>
                    <Text style={[mystyles.score, {marginLeft:'auto'}]}>{this.state.P1_score}</Text>
                    <PlayerButton 
                    feedbackColor={this.state.player1_status} 
                    myPress={this.myPress1}
                    playerId={"Player 1"}
                    />
                </View>

                {
                    this.state.showGoBack?
                    <TouchableOpacity 
                    style={{marginLeft:'auto',marginRight:'auto',padding:5,width:200,backgroundColor:defaultColor,borderRadius:10}}
                    onPress={()=> this.props.navigation.goBack()}
                    >
                        <Text style={mystyles.back}>
                        Go Back</Text>
                    </TouchableOpacity>
                    :null
                }

                <View style={{flex:1}}>
                    <Question question={this.state.currentQ}/>
                    <Text style={mystyles.score}>{this.state.P2_score}</Text>
                    <PlayerButton 
                    feedbackColor={this.state.player2_status} 
                    myPress={this.myPress2} 
                    playerId={"Player 2"}
                    />
                </View>

            </View>
        )
    }
}

const mystyles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 0,
    //   backgroundColor: 'rgb(211,211,211)'
      backgroundColor: 'white'
    },
    button: {
      flex:1,
      backgroundColor: 'blue'
    },

    textStyle: {
        fontSize: 20,
        color: 'green'
    },

    score: {
      fontSize: 40,
      fontWeight: 'bold',
      color: defaultColor,
      padding: 5,
      paddingTop: 0
    },

    back:{
        fontSize: 25,
        fontWeight: 'bold',
        color: 'white',
        textAlign: "center"
        // marginLeft: 'auto',
        // marginRight: 'auto',
   }
  });
  