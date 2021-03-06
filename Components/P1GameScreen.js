import React, { Component } from 'react'
import { StyleSheet, Button , Text, View, TextInput, TouchableOpacity, BackHandler, ToastAndroid, Alert} from 'react-native';
import styles from './styles'
import homo from '../Games/homo'
import color from '../Games/colors'
import capital from '../Games/capital'
import math from '../Games/math'

const Countdown = props => (
    <Text style={mystyle.countdown}>{props.count}</Text>
)

const PointsTime= props => (
    <View style={{flexDirection: 'row', paddingTop: -250, paddingBottom: 50}}>
        <View style={{paddingRight: 100}}>
            <Text style={{fontSize: 20, color: '#129793', fontWeight: 'bold'}}>Points</Text>
            <Text style={{fontSize: 20, color: '#129793', fontWeight: 'bold'}}>{props.points}</Text>
        </View>

        <View style={{paddingLeft: 100}}>
            <Text style={{fontSize: 20,color: '#129793',fontWeight: 'bold'}}>Time</Text>
            <Text style={{fontSize: 20,color: '#129793',fontWeight: 'bold'}}>{props.time}</Text>
        </View>
    </View>
)

const Remarks = props => {
    if(props.sremark == 1) {
        let random = Math.round(Math.random() * (props.good.length - 1))
        return (
            <View style={{paddingTop: 120}}>
                <Text style={{color: 'green',fontSize: 25}}>{props.good[random]}</Text>
            </View>
        )
    }

    else if(props.sremark == -1) {
        let random = Math.round(Math.random() * (props.bad.length - 1))
        return (
            <View style={{paddingTop: 120}}>
                <Text style={{color: 'red', fontSize: 25}}>{props.bad[random]}</Text>
            </View> 
        )
    }

    else return <View style={{paddingTop: 150}}></View>;

    
}

export default class P1GameScreen extends Component {
    _ismounted = false

    static navigationOptions = {
        header: null
    }

    constructor(props) {
        super(props)
        this.state = {
            game: [],
            points: 0,
            timeRemain: this.props.navigation.getParam('time') || 60,
            gameTitle: '',
            question: '',
            count: 3,
            showCountDown: true,
            showRest: false,
            currentQ: '',
            currentA:'',
            thecolor1: 'grey',
            thecolor2: 'grey',
            backPresses: 0,
            sendRemarks: 0,
            goodRemarks: ['Good!', 'Excellent!', 'Spot on!', 'Damn!', 'Hell Yeah!'],
            badRemarks: ['No!', 'Try Again!', 'Nah!', 'Oops!', 'Uh Oh!']
        }
    }

    setGame = () => {
        let thegame = this.props.navigation.getParam('game');
        if(thegame === 'homo') {
            this.setState({game: homo, gameTitle: 'Homophones', question: 'Are the two words Homophones?'})
            let random = Math.round(Math.random() * (homo.length-1))
            let myquestion =  
                <Text style={{fontSize: 30}}>
                    <Text>Word1: <Text style={{color: 'green'}}>{homo[random].word1}</Text>{`\n`}</Text>
                    <Text>Word2: <Text style={{color: 'red'}}>{homo[random].word2} </Text></Text>
                </Text>
            let answer = homo[random].answer
            this.setState({currentQ: myquestion, currentA: answer})
        }

        else if(thegame === 'math') {
            this.setState({game: math, gameTitle: 'Equations', question: 'Is the statement correct?'})
            let random = Math.round(Math.random() * (math.length-1))
            let myquestion =  <Text style={{fontSize: 30, color: 'blue'}}>{math[random].exp}</Text>
            let answer = math[random].answer
            this.setState({currentQ: myquestion, currentA: answer})
        }

        else if(thegame === 'capital') {
            this.setState({game: capital, gameTitle: 'Country-Capital', question: 'Is the city captital of the country?'})
            let random = Math.round(Math.random() * (capital.length-1))
            let myquestion = 
                <Text style={{fontSize: 30}}>
                    <Text>Country: <Text style={{color: 'green'}}>{capital[random].country}</Text>{`\n`}</Text>
                    <Text>Capital: <Text style={{color: 'red'}}>{capital[random].capital} </Text></Text>
                </Text>
            let answer = capital[random].answer
            this.setState({currentQ: myquestion, currentA: answer})
        }

        else if(thegame === 'color') {
            this.setState({game: color, gameTitle: 'Color Match', question: 'Does the word matches the color'})
            let random = Math.round(Math.random() * (color.length-1))
            let myquestion = 
                <Text style={{fontSize: 60, color: color[random].color, fontWeight: 'bold'}}>{color[random].name}</Text>
            let answer = color[random].answer
            this.setState({currentQ: myquestion, currentA: answer})
        }

    }

    quitting = () => {
         Alert.alert(
            'Exit Game',
            'Do you want to quit?', [{
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel'
            }, {
                text: 'OK',
                onPress: () => this.props.navigation.navigate('Home')
            }, ], {
                cancelable: false
            }
        )
    }

    handleBackButton=() => {
        if(this.state.backPresses) {
            this.quitting()
            return true;
        }
        else {
            ToastAndroid.show('Press again to quit', ToastAndroid.SHORT);
            this.setState({backPresses: 1})
            setTimeout(()=> this.setState({backPresses: 0}), 2000)
            return true;
        }
    }

    componentDidMount() {

        this._ismounted = true
        this.setGame();    

        this.interval=setInterval(()=> this.decrementCount(),1000)
        this.thetimer=setInterval(()=>this.decrementTime(), 1000)

        this.backhandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackButton)
        // if(this._ismounted) {
        // }
    }

    componentWillUnmount() {
        clearInterval(this.interval)
        clearInterval(this.thetimer)
        this.backhandler.remove()
        // BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
        // this._ismounted = false
    }

    decrementTime = () => {
        let myuser = this.props.navigation.getParam('user')
        let myname = this.props.navigation.getParam('name')
        let thegame = this.props.navigation.getParam('game');

        if(this.state.showRest) {
            this.setState(prevState => ({timeRemain: prevState.timeRemain - 1}))
            if(this.state.timeRemain < 1) {
                this.setState({timeRemain: null})
                this.props.navigation.navigate('Player1Score', {user: myuser, name: myname, game: thegame, points: this.state.points, 
                                                    time: this.props.navigation.getParam('time')})
            }
        }
    }

    decrementCount=()=> {
        this.setState(prevState => ({count: prevState.count - 1}))
        if(this.state.count < 1) {
            this.setState({count: null, showCountDown: false, showRest: true})
        }
    }

    checkAnswer = (decision, button) => {

        let myuser = this.props.navigation.getParam('user')
        let myname = this.props.navigation.getParam('name')
        let thegame = this.props.navigation.getParam('game');

        if(this.state.timeRemain < 1) {
            this.setState({timeRemain: null})
            this.props.navigation.navigate('Player1Score', {user: myuser, name: myname, game: thegame, points: this.state.points,
                                                            time: this.props.navigation.getParam('time')})
        }

        if(this.state.currentA === decision) {
            this.setState(prevState => ({points: prevState.points + 1}))
            if(button === 'button1') {
                this.setState({thecolor1: 'green', sendRemarks: 1})
                setTimeout(()=> this.setState({thecolor1: 'grey', sendRemarks: 0}), 300)
            }

            else {
                this.setState({thecolor2: 'green',sendRemarks: 1})
                setTimeout(()=> this.setState({thecolor2: 'grey', sendRemarks: 0}), 300)
            }
        }

        else {
            this.setState(prevState => ({points: prevState.points - 1}))
            if(button === 'button1') {
                this.setState({thecolor1: 'red', sendRemarks: -1})
                setTimeout(()=> this.setState({thecolor1: 'grey',sendRemarks: 0}), 300)
            }

            else {
                this.setState({thecolor2: 'red',sendRemarks: -1})
                setTimeout(()=> this.setState({thecolor2: 'grey',sendRemarks: 0}), 300)
            }
        }


        if(thegame === 'homo') {
            let random = Math.round(Math.random() * (homo.length-1))
            let myquestion = 
                <Text style={{fontSize: 30}}>
                    <Text>Word1: <Text style={{color: 'green'}}>{homo[random].word1}</Text>{`\n`}</Text>
                    <Text>Word2: <Text style={{color: 'red'}}>{homo[random].word2} </Text></Text>
                </Text>
            let answer = homo[random].answer
            this.setState({currentQ: myquestion, currentA: answer})
        }

        else if(thegame === 'math') {
            let random = Math.round(Math.random() * (math.length-1))
            let myquestion =  <Text style={{fontSize: 30, color: 'blue'}}>{math[random].exp}</Text>
            let answer = math[random].answer
            this.setState({currentQ: myquestion, currentA: answer})
        }

        else if(thegame === 'capital') {
            let random = Math.round(Math.random() * (capital.length-1))
            let myquestion = 
                 <Text style={{fontSize: 30}}>
                    <Text>Country: <Text style={{color: 'green'}}>{capital[random].country}</Text>{`\n`}</Text>
                    <Text>Capital: <Text style={{color: 'red'}}>{capital[random].capital} </Text></Text>
                </Text>
            let answer = capital[random].answer
            this.setState({currentQ: myquestion, currentA: answer})
        }

        else if(thegame === 'color') {
            let random = Math.round(Math.random() * (color.length-1))
            let myquestion = 
                <Text style={{fontSize: 60, color: color[random].color, fontWeight: 'bold'}}>{color[random].name}</Text>
            let answer = color[random].answer
            this.setState({currentQ: myquestion, currentA: answer})
        }
        
    }

    render() {
        if(this.state.showCountDown) {
            return (
            <View style={[styles.container,{paddingTop: 30}]}>
                <PointsTime points={this.state.points} time={this.state.timeRemain}/>
               <Text style={[styles.welcome, {fontSize: 40, letterSpacing: 1,color: 'black',fontWeight: 'bold'}]}>{this.state.gameTitle}</Text>
                     <View style={{height:10}}/>
                    <Text style={{fontSize: 20}}>{this.state.question}</Text>
                    <View style={{height:30}}/>
                
                <View>
                  <Countdown count={this.state.count}/>
                </View>
            </View>
 
            )
        }

        if(this.state.showRest) {
            return (
                <View style={[styles.container,{paddingTop: 30}]}>
                    <PointsTime points={this.state.points} time={this.state.timeRemain}/>
                    <Text style={[styles.welcome, {fontSize: 40, letterSpacing: 1, color:'black',fontWeight: 'bold'}]}>{this.state.gameTitle}</Text>
                     <View style={{height:10}}/>
                    <Text style={{fontSize: 20}}>{this.state.question}</Text>
                    <View style={{height:30}}/>
                    
                    <View>{this.state.currentQ}</View>

                    <Remarks sremark={this.state.sendRemarks}
                             good={this.state.goodRemarks }
                             bad={this.state.badRemarks }
                    />
                    
                    <View style={[mystyle.buttons]}>
                        <TouchableOpacity onPressIn={()=> {
                            this.checkAnswer(true, 'button1');
                            
                        }}>
                            <View style={[mystyle.mybutton, {backgroundColor: this.state.thecolor1}]}>
                                <Text style={styles.buttonText}>YES</Text>
                            </View>
                        </TouchableOpacity>

                        <View style={{paddingLeft: 20}}></View>

                        <TouchableOpacity onPressIn={()=> {
                            this.checkAnswer(false, 'button2');
                        }}>
                            <View style={[mystyle.mybutton, {backgroundColor: this.state.thecolor2}]}>
                                <Text style={styles.buttonText}>NO</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            )
        }

        return (
            <View style={styles.container}>
               <Text style={[styles.welcome, {fontSize: 20, letterSpacing: 1}]}>{this.state.question}</Text>
                <View style={{height:30}}/>
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
        paddingTop: 80,
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
        shadowColor: '#129793',
        shadowOffset: {
          width: 0,
          height: 4
        },
        shadowRadius: 5,
        shadowOpacity: 0.8
    },

    countdown: {
        textAlign: 'center', 
        fontSize: 150, 
        color: 'red'
    }
})
