
import React, { Component } from 'react'
import { StyleSheet,BackHandler, Button , Text, View, TextInput, TouchableOpacity, Image, Alert} from 'react-native';
import styles from './styles'

class GameInstructionScreen extends Component {

    componentDidMount(){
       this.backhandler = BackHandler.addEventListener('hardwareBackPress', ()=> this.props.navigation.navigate('Home'))
    }

    componentWillUnmount(){
       this.backhandler.remove()
    }

    name = this.props.navigation.getParam('name').split(" ")[0]
    render() {
        return (
            // <View style={styles.container}>
            //    {/* <Text style={[styles.welcome, {letterSpacing: 1}]}>
            //        Instructions
            //    </Text> */}

                <View style={{paddingTop: 0, margin: 30}}>
                    {/* <Text>Dear <Text style={{color: 'green'}}>{this.name}</Text>, {'\n'}Welcome to Edukid, a place to learn,
                    a place for fun.{'\n'}{'\n'} </Text> */}

        <Text style={[{textAlign:'center'},{color: 'green'},{fontSize: 25}]}>
        Single Player{"\n"}
        </Text>

<Text>
The objective of the game is to score as many points as possible by giving more 
correct answers in a limited amount of time. Tap <Text style={{color: 'blue'}}>yes </Text> 
if you agree with the statement on the screen and <Text style={{color: 'red'}}>no </Text> 
if you disagree with it.{"\n"}
{"\n"}
</Text>

<Text style={[{textAlign:'center',color: 'green',fontSize: 25}]}>
Multi-player{"\n"}
</Text>

<Text>
Two human players compete against each other, the objective is to get more points than the opponent by giving more correct answers in a limited amount of time. Tap on the button if you think that the statement on the screen is correct or leave the question unanswered if you think otherwise. {"\n"}
{"\n"}
</Text>

<Text style={[{textAlign:'center',color: 'green',fontSize: 25}]}>
Scoring{"\n"}
</Text>

<Text>
+1 point for every correct answer{"\n"}
-1 point for every wrong answer{"\n"}

                    </Text>
        {/* //</View> */}
            </View>
        )
    }
}

export default GameInstructionScreen

// const styles = StyleSheet.create({
//     container: {
//         alignItems: 'center',
//         justifyContent: 'center',
//     }
// })
/*
Scoring:
+1 point for every correct answer
-1 point for every wrong answer
Single Player 
The objective of the game is to score as many points as possible by giving more correct answers in a limited amount of time. Tap yes if you agree with the statement on the screen and no if you don't agree with it.
Multi-player:
Two human players compete against each other, the objective is to get more points than the opponent by giving more correct answers in a limited amount of time. Tap on the button if you think that the statement on the screen is correct or leave the question unanswered if you think otherwise.
Games:
Homophones:
This game tests a player's grammar and language skills. A pair of words would be displayed on the screen and the player has to answer, using his knowledge of English language, whether the words are homophones of each other or not.
Equation:
This is a test of mathematical ability of the player. The player has to evaluate whether the statements on the screen evaluate to true or false.
Capital:
A player's general knowledge and geography skills are tested. A pair of words will be displayed on the screen, one representing the city and the other representing the country. The player has to answer whether the city is the capital of the country.
Color Match:
This game tests the player's the quick-thinking ability and motor skills. A color name will be displayed on the screen. The player should only answer yes if the color name matches with the color text.
*/