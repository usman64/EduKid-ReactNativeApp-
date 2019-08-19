import React, {Component} from 'react';
import {View,Text,StyleSheet, TouchableHighlight, Alert,StatusBar } from 'react-native';
import {CountDown} from './CountDown'
import styles from './styles'


const win = 'lawngreen'
const loss = 'red'
const defaultColor = 'rgb(211,211,211)'


const PlayerButton = (props) => (
    <TouchableHighlight 
    onPressIn={props.myPress}
    underlayColor={props.player}
    // style={styles.button}
    style={{flex:1,backgroundColor:props.player}}
    >
      <View></View>
    </TouchableHighlight>
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
            player2_status: defaultColor
        }
    }

    componentDidMount(){
        this.interval=setInterval(()=> this.decrementCount(),1000)
    }

    componentWillUnmount(){
        clearInterval(this.interval)
    }


    myPress1 = () => {
        if(this.state.player2_status === defaultColor && this.state.player1_status === defaultColor)
        {
        this.setState({player1_status: win}, () => setTimeout(() => this.setState({player1_status:defaultColor}), 2000))
        // Alert.alert('Player1_status') 
        }
        
    }

    myPress2 = () => {
    if(this.state.player1_status === defaultColor && this.state.player2_status === defaultColor)
    {
        this.setState({player2_status: loss}, () => setTimeout(() => this.setState({player2_status:defaultColor}), 2000))
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
                <View style={{flex:2}}></View>
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
    }
  });
  